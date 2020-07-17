#!/usr/bin/env python3

import asyncio
import multiprocessing
import queue
import struct

import websockets


class WebSocketServer(multiprocessing.Process):
    """
    The websocket server.
    """

    def __init__(self,
                 data_queue: multiprocessing.Queue,
                 control_queue: multiprocessing.Queue):
        multiprocessing.Process.__init__(self)
        self._data_queue = data_queue
        self._control_queue = control_queue

    def run(self):
        start_server = websockets.serve(self.serve_connection, "0.0.0.0", 5555)

        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_forever()

        print("WebSocket server process exited")
        return

    async def serve_connection(self, websocket, path):
        print(f"Serving client at {websocket.remote_address}")
        while True:
            try:
                # timeout on queue read so we can, if we wanted to, exit our forever loop
                display_on, sps, centre, spec, peak, time_start, time_end = self._data_queue.get(timeout=0.1)

                num_floats=int(spec.size)
                # pack the data up in binary, watch out for sizes
                # ignoring times for now as still to handle 8byte ints in javascript
                message = struct.pack(f"!5i{num_floats}f{num_floats}f",
                                      int(sps),  # 4bytes
                                      int(centre),  # 4bytes
                                      int(1000),  # 4bytes
                                      int(2000),  # 4bytes
                                      num_floats,  # 4bytes (N)
                                      *spec,  # N * 4byte floats (32bit)
                                      *peak)  # N * 4byte floats (32bit)

                await websocket.send(message)
                await asyncio.sleep(1 / 20.0)  # max 20fps, so wait around this long before checking again
            except queue.Empty:
                # unlikely to every keep up so shouldn't end up here
                await asyncio.sleep(0.1)


if __name__ == '__main__':
    WebSocketServer()
