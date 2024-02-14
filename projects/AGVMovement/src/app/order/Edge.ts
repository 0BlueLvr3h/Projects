import { Action } from "./Action";
import { ActionParameter } from "./ActionParameter";

export class Edge {

    private edgeId: String;
    private sequenceId: number;
    private startNodeId: String;
    private endNodeId: String;
    private released: boolean;
    private actions: Array<Action>
    
	constructor($edgeId: String, 
                    $sequenceId: number, 
                        $startNodeId: String, 
                            $endNodeId: String, 
                                $released: boolean,
                                    $actions : Array<Action>) {
		this.edgeId = $edgeId;
		this.sequenceId = $sequenceId;
		this.startNodeId = $startNodeId;
		this.endNodeId = $endNodeId;
		this.released = $released;
        this.actions = $actions;
	}


    /**
     * Getter $edgeId
     * @return {String}
     */
	public get $edgeId(): String {
		return this.edgeId;
	}

    /**
     * Getter $sequenceId
     * @return {number}
     */
	public get $sequenceId(): number {
		return this.sequenceId;
	}

    /**
     * Getter $startNodeId
     * @return {String}
     */
	public get $startNodeId(): String {
		return this.startNodeId;
	}

    /**
     * Getter $endNodeId
     * @return {String}
     */
	public get $endNodeId(): String {
		return this.endNodeId;
	}

    /**
     * Getter $released
     * @return {boolean}
     */
	public get $released(): boolean {
		return this.released;
	}

    /**
     * Getter $actions
     * @return {Array<Action>}
     */
	public get $actions(): Array<Action> {
		return this.actions;
	}

    /**
     * Setter $edgeId
     * @param {String} value
     */
	public set $edgeId(value: String) {
		this.edgeId = value;
	}

    /**
     * Setter $sequenceId
     * @param {number} value
     */
	public set $sequenceId(value: number) {
		this.sequenceId = value;
	}

    /**
     * Setter $startNodeId
     * @param {String} value
     */
	public set $startNodeId(value: String) {
		this.startNodeId = value;
	}

    /**
     * Setter $endNodeId
     * @param {String} value
     */
	public set $endNodeId(value: String) {
		this.endNodeId = value;
	}

    /**
     * Setter $released
     * @param {boolean} value
     */
	public set $released(value: boolean) {
		this.released = value;
	}
    /**
     * Setter $actions
     * @param {Array<Action>} value
     */
	public set $actions(value: Array<Action>) {
		this.actions = value;
	}

    


}