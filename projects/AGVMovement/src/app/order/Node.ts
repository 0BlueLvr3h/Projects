import { Action } from "./Action";
import { Position } from "./Position";

export class Node{
    private nodeId : String;
    private sequenceId : number;
    private released : boolean;
    private nodePosition : Position;
    private actions : Array<Action>;


	constructor($nodeId: String, $sequenceId: number, $released: boolean, $nodePosition: Position, $actions: Array<Action>) {
		this.nodeId = $nodeId;
		this.sequenceId = $sequenceId;
		this.released = $released;
		this.nodePosition = $nodePosition;
		this.actions = $actions;
	}


    /**
     * Getter $nodeId
     * @return {String}
     */
	public get $nodeId(): String {
		return this.nodeId;
	}

    /**
     * Getter $sequenceId
     * @return {number}
     */
	public get $sequenceId(): number {
		return this.sequenceId;
	}

    /**
     * Getter $released
     * @return {boolean}
     */
	public get $released(): boolean {
		return this.released;
	}

    /**
     * Getter $nodePosition
     * @return {Position}
     */
	public get $nodePosition(): Position {
		return this.nodePosition;
	}

    /**
     * Getter $actions
     * @return {Array<Action>}
     */
	public get $actions(): Array<Action> {
		return this.actions;
	}

    /**
     * Setter $nodeId
     * @param {String} value
     */
	public set $nodeId(value: String) {
		this.nodeId = value;
	}

    /**
     * Setter $sequenceId
     * @param {number} value
     */
	public set $sequenceId(value: number) {
		this.sequenceId = value;
	}

    /**
     * Setter $released
     * @param {boolean} value
     */
	public set $released(value: boolean) {
		this.released = value;
	}

    /**
     * Setter $nodePosition
     * @param {Position} value
     */
	public set $nodePosition(value: Position) {
		this.nodePosition = value;
	}

    /**
     * Setter $actions
     * @param {Array<Action>} value
     */
	public set $actions(value: Array<Action>) {
		this.actions = value;
	}

}