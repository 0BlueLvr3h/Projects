import { ActionParameter } from "./ActionParameter";

export class Action{
    private actionId : String;
    private actionType : String;
    private blockingType : String;
    private actionParameters : Array<ActionParameter>;


	constructor($actionId: String, $actionType: String, $blockingType: String, $actionParameters: Array<ActionParameter>) {
		this.actionId = $actionId;
		this.actionType = $actionType;
		this.blockingType = $blockingType;
		this.actionParameters = $actionParameters;
	}

    /**
     * Getter $actionId
     * @return {String}
     */
	public get $actionId(): String {
		return this.actionId;
	}

    /**
     * Getter $actionType
     * @return {String}
     */
	public get $actionType(): String {
		return this.actionType;
	}

    /**
     * Getter $blockingType
     * @return {String}
     */
	public get $blockingType(): String {
		return this.blockingType;
	}

    /**
     * Getter $actionParameters
     * @return {Array<ActionParameter>}
     */
	public get $actionParameters(): Array<ActionParameter> {
		return this.actionParameters;
	}

    /**
     * Setter $actionId
     * @param {String} value
     */
	public set $actionId(value: String) {
		this.actionId = value;
	}

    /**
     * Setter $actionType
     * @param {String} value
     */
	public set $actionType(value: String) {
		this.actionType = value;
	}

    /**
     * Setter $blockingType
     * @param {String} value
     */
	public set $blockingType(value: String) {
		this.blockingType = value;
	}

    /**
     * Setter $actionParameters
     * @param {Array<ActionParameter>} value
     */
	public set $actionParameters(value: Array<ActionParameter>) {
		this.actionParameters = value;
	}

}