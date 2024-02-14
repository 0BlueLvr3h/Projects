import { Edge } from "./Edge";
import { Node } from "./Node";

export class Order {
    public orderId : String;
    private orderUpdateId : number;
    private nodes : Array<Node>;
    private edge : Array<Edge>;



	constructor($orderId: String, $orderUpdateId: number, $nodes: Array<Node>, $edge: Array<Edge>) {
		this.orderId = $orderId;
		this.orderUpdateId = $orderUpdateId;
		this.nodes = $nodes;
		this.edge = $edge;
	}





	public getOrderId(): String {
		return this.orderId;
	}

    /**
     * Getter $orderUpdateId
     * @return {number}
     */
	public get $orderUpdateId(): number {
		return this.orderUpdateId;
	}

    /**
     * Getter $nodes
     * @return {Array<Node>}
     */
	public get $nodes(): Array<Node> {
		return this.nodes;
	}

    /**
     * Getter $edge
     * @return {Array<Edge>}
     */
	public get $edge(): Array<Edge> {
		return this.edge;
	}

    /**
     * Setter $orderId
     * @param {String} value
     */
	public set $orderId(value: String) {
		this.orderId = value;
	}

    /**
     * Setter $orderUpdateId
     * @param {number} value
     */
	public set $orderUpdateId(value: number) {
		this.orderUpdateId = value;
	}

    /**
     * Setter $nodes
     * @param {Array<Node>} value
     */
	public set $nodes(value: Array<Node>) {
		this.nodes = value;
	}

    /**
     * Setter $edge
     * @param {Array<Edge>} value
     */
	public set $edge(value: Array<Edge>) {
		this.edge = value;
	}

}