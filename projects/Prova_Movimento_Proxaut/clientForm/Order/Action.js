class Action {
    constructor(actionId, actionType, blockingType, actionParameters) {
        this.actionId = actionId;
        this.actionType = actionType;
        this.blockingType = blockingType;
        this.actionParameters = actionParameters;
    }

    getActionId() {
        return this.actionId;
    }
    
    getActionType() {
        return this.actionType;
    }
    
    getBlockingType() {
        return this.blockingType;
    }
    
    getActionParameters() {
        return this.actionParameters;
    }


    setActionId(actionId) {
        this.actionId = actionId;
    }

    setActionType(actionType) {
        this.actionType = actionType;
    }

    setBlockingType(blockingType) {
        this.blockingType = blockingType;
    }

    setActionParameters(actionParameters) {
        this.actionParameters = actionParameters;
    }
}