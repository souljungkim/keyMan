/****************************************************************************************************
 *
 *
 * DefinedKeyMapCluster
 *
 *
 ****************************************************************************************************/
KeyMan.DefinedKeyMapCluster = getClazz(function(){
    KeyMan.KeyMapCluster.apply(this, arguments);
    this.id = 'defined';
    this.name = 'defined';
})
.extend(KeyMan.KeyMapCluster)
.returnFunction();

KeyMan.DefinedKeyMapCluster.prototype.newKeyMap = function(keyMap){
    var that = this;
    //- Find DefinedKeyHandler
    var keyHandler = this.keyman.getKeyHandler(KeyMan.DefinedKeyHandler.TYPE);
    //- Generate default KeyMap
    keyHandler.defaultDefinedKeyMap.traverse(function(fk){
        fk.setType(KeyMan.DefinedKeyHandler.TYPE).setupKeyStepList();
        fk.keys = keyHandler.correctKeys(fk.keys);
    });
    var newKeyMap = KeyMan.KeyMapCluster.prototype.newKeyMap.call(this, keyMap);
    newKeyMap.add(keyHandler.defaultDefinedKeyMap);
    return newKeyMap;

    // keyHandler.defaultDefinedKeyMap.traverse(function(fk){
    //     fk.setType(KeyMan.DefinedKeyHandler.TYPE).setupKeyStepList();
    //     fk.keys = keyHandler.correctKeys(fk.keys);
    // });
    // var extractedData = keyHandler.defaultDefinedKeyMap.extractData()._data;
    // console.error('777', keyHandler.defaultDefinedKeyMap);
    // console.error('77', extractedData);
    // var newKeyMap = KeyMan.KeyMap.copy(extractedData, {});
    // this.add(newKeyMap);
    // return newKeyMap;
};

// KeyMan.DefinedKeyMapCluster.prototype.addKeyMap = function(keyMap){
//     if (this.hasDefinedKeyMap(keyMap))
//         return this;
//     if (this.keyMaps == null)
//         this.keyMaps = {};
//     this.keyMaps[keyMap.id] = keyMap;
//     this.length++;
//     /** Check selected map **/
//     if (!this.keyMapSelectedWhenMultiMapMode || this.length == 1)
//         this.selectKeyMapOnMultiMapMode(keyMap);
//     /** Setup **/
//     keyMap.setParent(this);
//     keyMap.setup(this.keyman);
//     /** Event **/
//     //- Does not works when init.
//     if (this.parent)
//         this.parent.execEventListenerByEventName(KeyMan.EVENT_ADDEDDEFINEDMAP, keyMap);
//     return this;
// };
// KeyMan.DefinedKeyMapCluster.prototype.removeKeyMap = function(keyMap){
//     if (!keyMap)
//         return;
//     var id = null;
//     if (keyMap instanceof KeyMan.DefinedKeyMap)
//         id = keyMap.id;
//     else{
//         id = keyMap;
//         keyMap = this.getDefinedKeyMap(id);
//     }
//     //Unsetup all keyObject
//     keyMap.unsetup();
//     //Remove keyMap
//     delete this.definedKeyMaps[id];
//     this.length--;
//     /** Check selected map **/
//     if (this.length == 0)
//         this.selectKeyMapOnMultiMapMode(null);
//     /** Event **/
//     if (this.parent)
//         this.parent.execEventListenerByEventName(KeyMan.EVENT_REMOVEDDEFINEDMAP, keyMap);
//     /** Save Auto **/
//     this.saveAuto();
//     /** null **/
//     keyMap.setParent(null).setKeyMan(null);
//     return this;
// };



/****************************************************************************************************
 *
 *
 * DefinedKeyMap
 *
 *
 ****************************************************************************************************/
//TODO: 임시
KeyMan.DefinedKeyMap = getClazz(function(){
    KeyMan.KeyMap.apply(this, arguments);
    // this.definedKeys = [];
    // this.definedKeyMap = {};
    this.keyGroupMan = new KeyMan.KeyGroupMan();
})
.extend(KeyMan.KeyMap)
.returnFunction();


KeyMan.DefinedKeyMap.prototype.getKeyGroupMan = function(){
    return this.keyGroupMan;
};

// KeyMan.DefinedKeyMap.prototype.set = function(definedKeys){
//     var that = this;
//     getData(definedKeys).each(function(definedKey){
//         that.definedKeyMap[definedKey.type] = definedKey;
//         console.debug('[DefiendKey] SET !', definedKey.type, definedKey);
//     });
// };
KeyMan.DefinedKeyMap.prototype.add = function(definedKey){
    // if (definedKey instanceof Array){
    //     for (var i=0; i<definedKey.length; i++){
    //         this.add(definedKey[i]);
    //     }
    //     return this;
    // }
    // if (definedKey instanceof KeyMan.DefinedFunctionKey){
    //     this.definedKeys.push(definedKey);
    //     this.definedKeyMap[definedKey.id] = definedKey;
    //     this.keyGroupMan.joinGroup(definedKey);
    //     definedKey.setKeyMan(this);
    //     // this.getTargetDefinedKeyMap().add(definedKey);
    //     console.debug('[DefiendKey] ADDED !', definedKey.type, definedKey);
    // }
    // return this;

    KeyMan.KeyMap.prototype.add.call(this, definedKey);
    this.keyGroupMan.joinGroup(definedKey);
    return this;
};
KeyMan.DefinedKeyMap.prototype.remove = function(definedKey){
    // if (this.definedKeys == null)
    //     return this;
    // if (definedKey instanceof Array){
    //     for (var i=0; i<definedKey.length; i++){
    //         this.remove(definedKey[i]);
    //     }
    //     return this;
    // }
    // if (definedKey instanceof KeyMan.DefinedFunctionKey)
    //     definedKey = definedKey.type;
    // if (typeof definedKey == 'string'){
    //     getData(this.definedKeys).remove(function(it){ return it.type == definedKey; });
    //     getData(this.definedKeyMap).remove(function(key, val){ return val.type == definedKey; });
    //     definedKey.setKeyMan(null);
    //     this.keyGroupMan.retireGroup(definedKey);
    //     // this.getTargetDefinedKeyMap().remove(definedKey);
    //     console.debug('[DefiendKey] REMOVED !', definedKey.type);
    // }
    // return this;

    KeyMan.KeyMap.prototype.remove.call(this, definedKey);
    this.keyGroupMan.retireGroup(definedKey);
    return this;
};


/****************************************************************************************************
 *
 *
 * DefinedKey
 *
 *
 ****************************************************************************************************/
KeyMan.DefinedFunctionKey = getClazz(function(object){
    KeyMan.FunctionKey.apply(this, arguments);
    this._id = getData().createUUID();
    this.id;
    this.type;
    this.name;
    this.title = '';
    this.sequence = -1;
    this.execute = null; //Function
    this.icon;

    //_
    // this.parent; //RunnerPool
    this.keyman; //KeyMan
    if (object)
        this.init(object);
})
.extend(KeyMan.FunctionKey)
.returnFunction();




/****************************************************************************************************
 *
 *
 * KeyGroup
 *
 *
 ****************************************************************************************************/
KeyMan.KeyGroup = function(keyman){
    this.name = null;
    this.modeWorkOnlyHighestPriority = false;
    this.modeWorkWhenKeyUp = false;
    this.functionKeyByNameMap = {};
    this.lastPressedTopPriorityFunctionKey = null;
    this.lastPressedTopPriorityFunctionKeySequence = 99999;

    this.bufferPressedFunctionKeyMap = {};
    this.lastKeyupFunctionKeys = [];
};
KeyMan.KeyGroup.prototype.setName = function(name){
    this.name = name;
    return this;
};
KeyMan.KeyGroup.prototype.setModeWorkOnlyHighestPriority = function(mode){
    this.modeWorkOnlyHighestPriority = mode;
    return this;
};
KeyMan.KeyGroup.prototype.setModeWorkWhenKeyUp = function(mode){
    this.modeWorkWhenKeyUp = mode;
    return this;
};
KeyMan.KeyGroup.prototype.checkModeWorkOnlyHighestPriority = function(){
    return this.modeWorkOnlyHighestPriority;
};
KeyMan.KeyGroup.prototype.checkModeWorkWhenKeyUp = function(){
    return this.modeWorkWhenKeyUp;
};

KeyMan.KeyGroup.prototype.get = function(name){
    if (name == null)
        return null;
    return this.functionKeyByNameMap[name];
};
KeyMan.KeyGroup.prototype.has = function(group){
    return !!this.get(group);
};
KeyMan.KeyGroup.prototype.add = function(fk){
    if (this.has(fk.name))
        return;
    if (fk.sequence = -1){
        fk.sequence = Object.keys(this.functionKeyByNameMap).length;
    }
    this.functionKeyByNameMap[fk.name] = fk;
    return this;
};
KeyMan.KeyGroup.prototype.contains = function(fk){
    var name = null;
    if (fk instanceof KeyMan.FunctionKey){
        name = fk.name;
    }else{
        name = fk;
    }
    var item = this.functionKeyByNameMap[name];
    // console.error(' - zzzz',name, this.functionKeyByNameMap, item);
    return !!item;
};

KeyMan.KeyGroup.prototype.keyup = function(upperKey){
    var functionKey, existing = false;
    for (var key in this.bufferPressedFunctionKeyMap){
        functionKey = this.bufferPressedFunctionKeyMap[key];
        if (functionKey.hasKey(upperKey)){
            //Collecting
            this.lastKeyupFunctionKeys.push(functionKey);
            //Trigger
            if (functionKey.isPressed()){
                functionKey.unpress().triggerKeyup();
            }
            existing = true;
        }
    }
    return existing;
};
KeyMan.KeyGroup.prototype.getPriorityInBuffer = function(){
    return this.lastPressedTopPriorityFunctionKey;
};
KeyMan.KeyGroup.prototype.getAllInBuffer = function(){
    var result = [];
    for (var name in this.bufferPressedFunctionKeyMap){
        result.push( this.bufferPressedFunctionKeyMap[name] );
    }
    return result;
};
KeyMan.KeyGroup.prototype.popLastKeyupFunctionKeys = function(){
    var result = this.lastKeyupFunctionKeys;
    for (var i=0, fk; i<this.lastKeyupFunctionKeys.length; i++){
        fk = this.lastKeyupFunctionKeys[i];
        delete this.bufferPressedFunctionKeyMap[fk.name];
    }
    //Clear
    this.lastKeyupFunctionKeys = [];
    //Find TopPriority
    var topPriorityFk = null;
    var topPriorityDefinedFk = null;
    var fkNames = Object.keys(this.bufferPressedFunctionKeyMap);
    for (var i=0; i<fkNames.length; i++){
        var fkName = fkNames[i];
        var fkInBuffer = this.bufferPressedFunctionKeyMap[fkName];
        var definedFkInBuffer = this.get(fkInBuffer.name);
        console.error(this.lastPressedTopPriorityFunctionKeySequence, fkInBuffer.name, definedFkInBuffer);
        if (topPriorityDefinedFk === null || topPriorityDefinedFk.sequence > definedFkInBuffer.sequence){
            topPriorityDefinedFk = definedFkInBuffer;
            topPriorityFk = fkInBuffer;
        }
    }
    if (topPriorityDefinedFk){
        this.lastPressedTopPriorityFunctionKeySequence = topPriorityDefinedFk.sequence;
        this.lastPressedTopPriorityFunctionKey = topPriorityFk;
        console.error(this.lastPressedTopPriorityFunctionKeySequence, this.lastPressedTopPriorityFunctionKey);
    }else{
        this.lastPressedTopPriorityFunctionKeySequence = 9999;
        this.lastPressedTopPriorityFunctionKey = null;
        console.error(this.lastPressedTopPriorityFunctionKeySequence, this.lastPressedTopPriorityFunctionKey);
    }
    return result;
};
KeyMan.KeyGroup.prototype.press = function(fk){
    this.bufferPressedFunctionKeyMap[fk.name] = fk;
    var pressedDefinedFk = this.get(fk.name);
    console.error('SQ =>', pressedDefinedFk.sequence, pressedDefinedFk.name);

    if (this.lastPressedTopPriorityFunctionKey === null || this.lastPressedTopPriorityFunctionKey === undefined){
        this.lastPressedTopPriorityFunctionKey = fk;
    }else if (this.lastPressedTopPriorityFunctionKeySequence > pressedDefinedFk.sequence){
        this.lastPressedTopPriorityFunctionKeySequence = pressedDefinedFk.sequence;
        this.lastPressedTopPriorityFunctionKey = fk;
    }
    return this;
};
KeyMan.KeyGroup.prototype.hasKeyInBuffer = function(){
    return Object.keys(this.bufferPressedFunctionKeyMap).length > 0;
};
KeyMan.KeyGroup.prototype.popPressedKeys = function(){
    var popedObject = this.bufferPressedFunctionKeyMap;
    this.bufferPressedFunctionKeyMap = {};
    this.lastPressedTopPriorityFunctionKey = null;
    return popedObject;
};
KeyMan.KeyGroup.prototype.getPressedAllInGroupExcept = function(exceptionFk){
    var result = [];
    var item;
    for (var name in this.bufferPressedFunctionKeyMap){
        item = this.bufferPressedFunctionKeyMap[name];
        if (name == exceptionFk.name){
            //Except
        }else{
            result.push(item);
        }
    }
    return result;
};
KeyMan.KeyGroup.prototype.getAllInBufferGroup = function(){
    var result = [];
    var item;
    for (var name in this.bufferPressedFunctionKeyMap){
        item = this.bufferPressedFunctionKeyMap[name];
        result.push(item);
    }
    return result;
};


/****************************************************************************************************
 *
 *
 * KeyGroupMan
 *
 *
 ****************************************************************************************************/
KeyMan.KeyGroupMan = function(keyman){
    this.groupMap = {};
    this.groupForNull = new KeyMan.KeyGroup();

    this.lastKeyupGroups = [];
};
KeyMan.KeyGroupMan.prototype.joinGroup = function(fk){
    var group = fk.group;
    if (group == null)
        return null;
    var keyGroup = this.getKeyGroup(group);
    if (keyGroup == null)
        keyGroup = this.newKeyGroup(group);
    keyGroup.add(fk);
    return this;
};
KeyMan.KeyGroupMan.prototype.retireGroup = function(fk){
    var group = fk.group;
    if (group != null){
        var keyGroup = this.getKeyGroup(group);
        if (keyGroup != null)
            keyGroup.remove(fk);
    }
    return this;
};
KeyMan.KeyGroupMan.prototype.getKeyGroup = function(group){
    if (group == null)
        return this.groupForNull;
    return this.groupMap[group];
};
KeyMan.KeyGroupMan.prototype.hasKeyGroup = function(group){
    return !!this.getKeyGroup(group);
};
KeyMan.KeyGroupMan.prototype.addKeyGroup = function(group){
    if (group instanceof Array){
        for (var i=0; i<group.length; i++){
            this.addKeyGroup(group[i]);
        }
        return this;
    }
    if (this.hasKeyGroup(group.name))
        return this;
    this.groupMap[group.name] = group;
    return this;
};
KeyMan.KeyGroupMan.prototype.newKeyGroup = function(group){
    var keyGroup = new KeyMan.KeyGroup().setName(group)
    this.addKeyGroup( keyGroup );
    return keyGroup;
};


KeyMan.KeyGroupMan.prototype.press = function(fk){
    var keyGroup = this.getKeyGroup(fk.group);
    keyGroup.press(fk);
    return this;
};
KeyMan.KeyGroupMan.prototype.getGroupsInBufferPressed = function(){
    var result = [], group;
    for (var name in this.groupMap){
        group = this.groupMap[name];
        if (group.hasKeyInBuffer())
            result.push(group);
    }
    return result;
};

KeyMan.KeyGroupMan.prototype.keyup = function(upperKey){
    var group, exsting = false;
    for (var name in this.groupMap){
        group = this.groupMap[name];
        if (group.keyup(upperKey)){
            this.lastKeyupGroups.push(group);
            exsting = true;
        }
    }
    return exsting;
};
KeyMan.KeyGroupMan.prototype.popLastKeyupGroups = function(){
    var result = this.lastKeyupGroups;
    this.lastKeyupGroups = [];
    return result;
};
KeyMan.KeyGroupMan.prototype.popLastKeyupFunctionKeys = function(){
    var result = [], group, popedLastKeyupFunctionKeys;
    for (var i=0; i<this.lastKeyupGroups.length; i++){
        group = this.lastKeyupGroups[i];
        popedLastKeyupFunctionKeys = group.popLastKeyupFunctionKeys();
        for (var j=0; j<popedLastKeyupFunctionKeys.length; j++){
            result.push( popedLastKeyupFunctionKeys[j] );
        }
    }
    return result;
};




/****************************************************************************************************
 *
 *
 * DefinedKeyHandler
 *
 *
 ****************************************************************************************************/
KeyMan.DefinedKeyHandler = getClazz(function(keyman){
    KeyMan.KeyHandler.apply(this, arguments);
    //Meta
    this.name = KeyMan.DefinedKeyHandler.TYPE;
    this.type = KeyMan.DefinedKeyHandler.TYPE;

    //TODO: 성질 정하자
    //- 서로 다른 그룹의 키와는 동시에 누를 수 있다!
    //- 하지만, 같은 그룹의 키는 설정에 따라 작동!
    //  - modeWorkOnlyHighestPriority - 가장 높은 우선순위 1개만 실행
    //  - modeWorkWhenKeyUp - 키를 Up할 때 다시 체크할지
    this.selectedKeyMapClusterId = '_user';
    this.selectedKeyMapCluster = null;
    this.defaultDefinedKeyMap = new KeyMan.DefinedKeyMap();
})
.extend(KeyMan.ShortcutKeyHandler)
.returnFunction();

KeyMan.DefinedKeyHandler.TYPE = 'DEFINED';
KeyMan.DefinedKeyHandler.EVENT_DEFINEDKEYDOWN = 'definedkeydown';
KeyMan.DefinedKeyHandler.EVENT_DEFINEDKEYUP = 'definedkeyup';

KeyMan.DefinedKeyHandler.prototype.correctKeys = function(keys){
    if (keys && keys.length == 1 && keys[0] instanceof Array){
        keys = keys[0];
    }
    return keys;
};

KeyMan.DefinedKeyHandler.prototype.setup = function(){
    var that = this;
    var keyman = this.keyman;
    this.setBeforeKeydownEventHandler(function(eventData){
        var key = eventData.key;
        var upperKey = eventData.upperKey;
        //Check Pressed - Not allowed
        that.statusPressed = !!keyman.downedKeyMap[upperKey];
        // that.statusPressed = !!keyman.downedDefinedKeyMap[upperKey];
    });
    this.setKeydownEventHandler(function(eventData){
        //Check Pressed - Not allowed
        if (that.statusPressed)
            return false;
        var upperKey = eventData.upperKey;
        // if (that.checkInIndex(upperKey))
        console.error('[ ~ KEY-DOWN ~ ]' + upperKey, keyman.downedDefinedKeyMap);
        that.keydown(upperKey);
    });
    this.setBeforeKeyupEventHandler(function(eventData){
        var key = eventData.key;
        var upperKey = eventData.upperKey;
        //Check Pressed - Not allowed
        that.statusPressed = !!keyman.downedKeyMap[upperKey];
    });
    this.setKeyupEventHandler(function(eventData){
        var upperKey = eventData.upperKey;
        // if (that.checkInIndex(upperKey))
        console.error('[ ~ KEY-UP ~ ]' + upperKey, keyman.downedDefinedKeyMap);
        that.keyup(upperKey);
    });
    this.selectKeyMapCluster();
};
KeyMan.DefinedKeyHandler.prototype.unsetup = function(){
    // var keyMap;
    // for (var keyMapId in this.keyMaps){
    //     keyMap = this.keyMaps[keyMapId];
    //     keyMap.unsetup();
    // }
    return this;
};

KeyMan.DefinedKeyHandler.prototype.getKeyGroupMan = function(){
      return this.defaultDefinedKeyMap.getKeyGroupMan();
};

KeyMan.DefinedKeyHandler.prototype.selectKeyMapCluster = function(keyMapCluster){
    var keyman = this.keyman;
    if (keyMapCluster !== null && keyMapCluster !== undefined){
        if (keyMapCluster instanceof KeyMan.KeyMapCluster){
            this.selectedKeyMapCluster = keyMapCluster;
            this.selectedKeyMapClusterId = keyMapCluster.id;
            return this;
        }else{
            this.selectedKeyMapClusterId = keyMapCluster;
        }
    }
    if (keyman){
        this.selectedKeyMapCluster = keyman.getCluster(this.selectedKeyMapClusterId);
    }
    return this;
};
KeyMan.DefinedKeyHandler.prototype.getSelectedKeyMapCluster = function(keyMapCluster){
    return this.selectedKeyMapCluster;
};
// KeyMan.DefinedKeyHandler.prototype.checkInIndex = function(upperKey){
//     var indexedFunctionKeyMap = keyMapCluster.getIndexedKeyMap(this.type);
//     var functionKeyMap = indexedFunctionKeyMap[upperKey];
//     return !!functionKeyMap;
// };
KeyMan.DefinedKeyHandler.prototype.checkMyTypeByFunctionKey = function(functionKey){
    return false;
};
KeyMan.DefinedKeyHandler.prototype.cloneDefaultDefinedKeyMap = function(definedKey){
    return this.defaultDefinedKeyMap.clone(definedKey);
};

KeyMan.DefinedKeyHandler.prototype.addKeyGroup = function(keyGroup){
    this.defaultDefinedKeyMap.keyGroupMan.addKeyGroup(keyGroup);
    return this;
};

KeyMan.DefinedKeyHandler.prototype.addDefinedKey = function(definedKey){
    this.defaultDefinedKeyMap.add(definedKey);
    return this;
};
KeyMan.DefinedKeyHandler.prototype.removeDefinedKey = function(definedKey){
    this.defaultDefinedKeyMap.remove(definedKey);
    return this;
};


KeyMan.DefinedKeyHandler.prototype.beforeKeydown = function(eventData){
    var key = eventData.key;
    var upperKey = eventData.upperKey;
    //Check Pressed - Not allowed
    this.statusPressed = !!this.keyman.downedKeyMap[upperKey];
    // that.statusPressed = !!keyman.downedDefinedKeyMap[upperKey];
};
KeyMan.DefinedKeyHandler.prototype.keydown = function(eventData){
    var that = this;
    var keyman = this.keyman;

    //Check Pressed - Not allowed
    if (that.statusPressed)
        return false;
    var upperKey = eventData.upperKey;
    // if (that.checkInIndex(upperKey))
    console.error('[ ~ KEY-DOWN ~ ]' + upperKey, keyman.downedDefinedKeyMap);

    //Check Time
    var currentTime = new Date().getTime();
    var connectionTime = currentTime - that.lastKeyDownTime;
    //Check Key
    var downedKeyList = Object.keys(keyman.downedKeyMap);
    var keySize = downedKeyList.length;
    that.lastKey = upperKey;
    that.lastKeySize = keySize;
    that.lastKeyDownTime = currentTime;

    var singleTargetCluster = this.getSelectedKeyMapCluster();
    console.error(singleTargetCluster.getIndexedKeyMap(this.type));
    var resultFunctionKeys = that.execute(singleTargetCluster, upperKey);
    console.error('[ ~ KEY-DOWN ~ ]' + upperKey, keyman.downedDefinedKeyMap);

    /** Add - metadata **/
    eventData.definedKey = getData(resultFunctionKeys).collect(function(fk){ return fk.name });

    /** Event **/
    if (resultFunctionKeys.length > 0){
        var downedDefinedKeyList = Object.keys(keyman.downedDefinedKeyMap);
        keyman.execEventListenerByEventName(KeyMan.DefinedKeyHandler.EVENT_DEFINEDKEYDOWN, {
            keyStepList: [new KeyMan.KeyStep(downedDefinedKeyList)]
        });
    }
};
KeyMan.DefinedKeyHandler.prototype.beforeKeyup = function(eventData){
    var key = eventData.key;
    var upperKey = eventData.upperKey;
    //Check Pressed - Not allowed
    this.statusPressed = !!this.keyman.downedKeyMap[upperKey];
};
KeyMan.DefinedKeyHandler.prototype.keyup = function(eventData){
    var that = this;
    var keyman = this.keyman;

    var upperKey = eventData.upperKey;
    // if (that.checkInIndex(upperKey))
    console.error('[ ~ KEY-UP ~ ]' + upperKey, keyman.downedDefinedKeyMap);

    //Check Keyup
    var downedKeyList = Object.keys(keyman.downedKeyMap);
    var nowKeySize = downedKeyList.length;
    /** Status **/
    that.lastKey = null;
    /** Event **/
    var fk;
    var keyupFk, keepGoingFk, priorityFk, keyGroup;
    var keyupFks = [];
    var keepGoingFks = [];
    var keepGoingGroups = [];
    // var beforeSize = that.indexedFunctionKeyBufferMap.length;
    var keyGroupMan = this.getKeyGroupMan();
    keyGroupMan.keyup(upperKey);
    keyupFks = keyGroupMan.popLastKeyupFunctionKeys();
    keepGoingGroups = keyGroupMan.popLastKeyupGroups();
    // console.error('@@@@@', keyupFks, keepGoingGroups);

    if (keyupFks.length > 0){
        //- Release DefinedKey
        this.releaseDefinedKeys(keyupFks);
        console.error('RELEASE! ', keyupFks);

        /** modeWorkWhenKeyUp **/
        //- Checking Not yet keyup functionKeys
        var resultFunctionKeys = [];
        var chagnedFunction, keepGoingGroup;
        for (var j=keepGoingGroups.length -1; j>-1; j--){
            keepGoingGroup = keepGoingGroups[j];
            if (keepGoingGroup.hasKeyInBuffer() && keepGoingGroup.checkModeWorkWhenKeyUp()){
                /** modeWorkOnlyHighestPriority **/
                chagnedFunction = true;
                if (keepGoingGroup.checkModeWorkOnlyHighestPriority()){
                    priorityFk = keepGoingGroup.getPriorityInBuffer();
                    resultFunctionKeys.push(priorityFk);
                    if (priorityFk !== null)
                        this.executeFunctionKey(priorityFk);
                    console.debug('priority', resultFunctionKeys);
                }else{
                    resultFunctionKeys = keepGoingGroup.getAllInBuffer();
                    this.executeFunctionKeys(resultFunctionKeys);
                    console.debug('all', resultFunctionKeys);
                }
            }
        }

        if (chagnedFunction){
            /** Add - metadata **/
            eventData.definedKey = getData(resultFunctionKeys).collect(function(fk){ return fk.name });

            /** Event **/
            var downedDefinedKeyList = Object.keys(keyman.downedDefinedKeyMap);
            console.error('[ ~~~~~~down ]', downedDefinedKeyList);
            keyman.execEventListenerByEventName(KeyMan.DefinedKeyHandler.EVENT_DEFINEDKEYDOWN, {
                keyStepList: [new KeyMan.KeyStep(downedDefinedKeyList)]
            });
        }
    }

    /** Event **/
    if (keyupFks.length > 0){
        // for (var i=0; i<keyupFks.length; i++){
        var downedDefinedKeyList = Object.keys(keyman.downedDefinedKeyMap);
        console.error('[ ~~~~~~up ]', downedDefinedKeyList);
        keyman.execEventListenerByEventName(KeyMan.DefinedKeyHandler.EVENT_DEFINEDKEYUP, {
            keyStepList: [new KeyMan.KeyStep(downedDefinedKeyList)]
        });
        // }
    }
};

KeyMan.DefinedKeyHandler.prototype.execute = function(keyMapCluster, upperKey){
    var resultFunctionKeys = [];
    var keyman = this.keyman;
    var keyGroupMan = this.getKeyGroupMan();
    if (keyMapCluster.modeLock)
        return resultFunctionKeys;
    var indexedFunctionKeyMap = keyMapCluster.getIndexedKeyMap(this.type);
    // console.error('#####',this.type,indexedFunctionKeyMap);
    var functionKeyMap = indexedFunctionKeyMap[upperKey];
    var fk, result, priorityFk, keyGroup;
    for (var keyId in functionKeyMap){
        fk = functionKeyMap[keyId];
        // if (fk.type != KeyMan.TYPE_DEFINED) //TODO: 임시로 이렇게 필터
        //     continue;
        if (!keyman.isOnKeys(fk)){
            console.error('X', fk.type, fk.name);
            fk.unpress();
            // this.releaseDefinedKey(fk);
            continue;
        }
        if (fk.modeLock)
            continue;

        //Run Shortcut
        // if (priorityFk == null)
        //     priorityFk = fk;
        if (fk.isPressed()) {
            console.error('-', fk.name);
            // return true;
        }else{
            console.error('O', fk.name);
            // this.indexedFunctionKeyBufferMap.push(fk);
            keyGroupMan.press(fk);
        }
    }

    /** modeWorkOnlyHighestPriority **/
    var groupsInBuffer = keyGroupMan.getGroupsInBufferPressed();
    if (groupsInBuffer.length > 0){
        for (var j=groupsInBuffer.length -1; j>-1; j--){
            keyGroup = groupsInBuffer[j];
            if (keyGroup.checkModeWorkOnlyHighestPriority()){
                priorityFk = keyGroup.getPriorityInBuffer();
                resultFunctionKeys.push(priorityFk);
                var keysToBeReleased = keyGroup.getPressedAllInGroupExcept(priorityFk);
                this.releaseDefinedKeys(keysToBeReleased);
                this.executeFunctionKey(priorityFk, keyMapCluster);
                console.debug('!!! priority ==>', priorityFk, keysToBeReleased, keyman.downedDefinedKeyMap);
            }else{
                resultFunctionKeys = keyGroup.getAllInBufferGroup();
                this.executeFunctionKeys(resultFunctionKeys, keyMapCluster);
                console.debug('!!! all ==>', keyGroup, keyman.downedDefinedKeyMap);
            }
        }
    }

    return resultFunctionKeys;
};
KeyMan.DefinedKeyHandler.prototype.executeFunctionKey = function(functionKey, keyMapCluster){
    //Check MultiMap
    if (!keyMapCluster)
        keyMapCluster = functionKey.parent.parent;
    if (keyMapCluster && keyMapCluster.modeMultiMap){
        if (functionKey.parent.id != keyMapCluster.keyMapSelectedWhenMultiMapMode)
            return false;
    }
    //Down
    this.pressDefinedKey(functionKey);
    //Execute
    functionKey.execute();
    //Check Event
    if (this.keyman){
        this.keyman.execEventListenerByEventName(KeyMan.EVENT_EXECUTE, {
            keyStepList: null,
            functionKey: functionKey,
        });
    }
    console.debug('[Execute FunctionKey(Defined)] ', functionKey);
    return true;
};
KeyMan.DefinedKeyHandler.prototype.executeFunctionKeys = function(functionKeys, keyMapCluster){
    for (var name in functionKeys){
        this.executeFunctionKey(functionKeys[name], keyMapCluster);
    }
    return this;
};

KeyMan.DefinedKeyHandler.prototype.pressDefinedKey = function(functionKey){
    var keyman = this.keyman;
    //Down
    functionKey.press().triggerKeydown();
    keyman.downedDefinedKeyMap[functionKey.name] = true;
    return this;
};

KeyMan.DefinedKeyHandler.prototype.releaseDefinedKey = function(functionKey){
    var keyman = this.keyman;
    //Up
    // functionKey.unpress().triggerKeyup();
    delete keyman.downedDefinedKeyMap[functionKey.name];
    // var foundIndex = this.indexedFunctionKeyBufferMap.indexOf(functionKey);
    // if (foundIndex != -1)
    //     this.indexedFunctionKeyBufferMap.splice(foundIndex, 1);
    return this;
};
KeyMan.DefinedKeyHandler.prototype.releaseDefinedKeys = function(functionKeys){
    for (var name in functionKeys){
        this.releaseDefinedKey(functionKeys[name]);
    }
    return this;
};

