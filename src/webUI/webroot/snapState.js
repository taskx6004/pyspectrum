/*
    The state of snapshots
*/

'use strict';


snapState.prototype.setBaseName = function(name) {
    this.baseFilename =  name;
}
snapState.prototype.setTriggerType = function(type) {
    this.triggerType = type;
}
snapState.prototype.setTriggerState = function(state) {
    this.triggerState = state;
}
snapState.prototype.setTriggers = function(trigs) {
    this.triggers = trigs;
}
snapState.prototype.setPreTriggerMilliSec = function(preMilliSec) {
    this.preTriggerMilliSec = parseInt(preMilliSec);
}
snapState.prototype.setPostTriggerMilliSec = function(postMilliSec) {
    this.postTriggerMilliSec = parseInt(postMilliSec);
}
snapState.prototype.setSnapState = function(state) {
    this.snapState = state;
}
snapState.prototype.setCurrentSize = function(size) {
    this.snapCurrentSize = size;
}
snapState.prototype.setExpectedSize = function(size) {
    this.snapExpectedSize = size;
}
snapState.prototype.setDirectoryList = function(dirList) {
    this.directoryList = dirList;
}
snapState.prototype.setDeleteFilename = function(name) {
    this.deleteFileName = name;
}
snapState.prototype.setFileFormat = function(fileFormat) {
    this.fileFormat = fileFormat;
}


snapState.prototype.getBaseName = function() {
    return this.baseFilename;
}
snapState.prototype.getTriggerType = function() {
    return this.triggerType;
}
snapState.prototype.getTriggerState = function() {
    return this.triggerState;
}
snapState.prototype.getTriggers = function() {
    return this.triggers;
}
snapState.prototype.getPreTriggerMilliSec = function() {
    return this.preTriggerMilliSec;
}
snapState.prototype.getPostTriggerMilliSec = function() {
    return this.postTriggerMilliSec;
}
snapState.prototype.getSnapState = function() {
    return this.snapState;
}
snapState.prototype.getCurrentSize = function() {
    return this.snapCurrentSize;
}
snapState.prototype.getExpectedSize = function() {
    return this.snapExpectedSize;
}
snapState.prototype.getDirectoryList = function() {
    return this.directoryList;
}
snapState.prototype.getDeleteFilename = function() {
    return this.deleteFileName;
}
snapState.prototype.getFileFormat = function() {
    return this.fileFormat;
}
snapState.prototype.getDirectoryListEntries = function() {
    return this.directoryList.length;
}

snapState.prototype.setSnapFromJason = function(jsonConfig) {
    snapState.setDeleteFilename("");

    //console.log(jsonConfig)
    let updateSnapTable = false;
    if (jsonConfig.baseFilename != snapState.getBaseName()) {
        snapState.setBaseName(jsonConfig.baseFilename);
        updateSnapTable = true;
    }
    if (jsonConfig.triggerType != snapState.getTriggerType()) {
        snapState.setTriggerType(jsonConfig.triggerType);
        updateSnapTable = true;
    }
    if (JSON.stringify(jsonConfig.triggers) != JSON.stringify(snapState.getTriggers())) {
        snapState.setTriggers(jsonConfig.triggers);
        updateSnapTable = true;
    }
    if (jsonConfig.preTriggerMilliSec != snapState.getPreTriggerMilliSec()) {
        snapState.setPreTriggerMilliSec(jsonConfig.preTriggerMilliSec);
        updateSnapTable = true;
    }
    if (jsonConfig.postTriggerMilliSec != snapState.getPostTriggerMilliSec()) {
        snapState.setPostTriggerMilliSec(jsonConfig.postTriggerMilliSec);
        updateSnapTable = true;
    }
    if (jsonConfig.snapState != snapState.getSnapState()) {
        snapState.setSnapState(jsonConfig.snapState);
    }
    if (jsonConfig.triggerState != snapState.getTriggerState()) {
        snapState.setTriggerState(jsonConfig.triggerState);
        updateSnapTable = true;
    }
    if (jsonConfig.currentSizeMbytes != snapState.getCurrentSize()) {
        snapState.setCurrentSize(jsonConfig.currentSizeMbytes);
        updateSnapTable = true;
    }
    if (jsonConfig.expectedSizeMbytes != snapState.getExpectedSize()) {
        snapState.setExpectedSize(jsonConfig.expectedSizeMbytes);
        updateSnapTable = true;
    }
    if (jsonConfig.file_format != snapState.getFileFormat()) {
        snapState.setFileFormat(jsonConfig.file_format);
    }

    // just on size discrepancy for now
    if(!(jsonConfig.directory_list.length === snapState.directoryList.length)) {
        snapState.setDirectoryList(jsonConfig.directory_list);
        updateSnapTable = true;
    }
    return updateSnapTable;
}

snapState.prototype.getResetSnapStateUpdated = function() {
    let state = this.snapStateUpdated;
    if (state) {
        this.snapStateUpdated = false;
    }
    return state;
}
snapState.prototype.setSnapStateUpdated = function() {
    this.snapStateUpdated = true;
}
snapState.prototype.getSnapStateUpdated = function() {
    return this.snapStateUpdated;
}

function handleSnapTrigger() {
    snapState.setSnapState("start");
    snapState.setSnapStateUpdated();
}
function handleSnapBaseNameChange(name) {
    snapState.setBaseName(name);
    snapState.setSnapStateUpdated();
}
function handleSnapTriggerModeChange(triggerType) {
    snapState.setTriggerType(triggerType);
    snapState.setSnapStateUpdated();
}
function handleSnapPreTriggerChange(millisec) {
    snapState.setPreTriggerMilliSec(millisec);
    snapState.setSnapStateUpdated();
}
function handleSnapPostTriggerChange(millisec) {
    snapState.setPostTriggerMilliSec(millisec);
    snapState.setSnapStateUpdated();
}
function handleSnapFileFormatChange(fileFormat) {
    snapState.setFileFormat(fileFormat);
    snapState.setSnapStateUpdated();
}


function snapState() {
    this.type = "snapUpdate";
    this.snapStateUpdated = false;

    this.baseFilename = "";
    this.snapState = ""; // start to trigger
    this.preTriggerMilliSec = 0;
    this.postTriggerMilliSec = 0;
    this.triggerState = "0";
    this.triggerType = "0";
    this.triggers = [];
    this.snapCurrentSize = 0;
    this.snapExpectedSize = 0;
    this.directoryList = [];
    this.deleteFileName = "";
    this.fileFormat = "bin";
}
