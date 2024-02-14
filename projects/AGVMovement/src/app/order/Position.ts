export class Position{
    private x : number;
    private y : number;
    private mapId : String;


	constructor($x: number, $y: number, $mapId: String) {
		this.x = $x;
		this.y = $y;
		this.mapId = $mapId;
	}


    /**
     * Getter $x
     * @return {number}
     */
	public get $x(): number {
		return this.x;
	}

    /**
     * Getter $y
     * @return {number}
     */
	public get $y(): number {
		return this.y;
	}

    /**
     * Getter $mapId
     * @return {String}
     */
	public get $mapId(): String {
		return this.mapId;
	}

    /**
     * Setter $x
     * @param {number} value
     */
	public set $x(value: number) {
		this.x = value;
	}

    /**
     * Setter $y
     * @param {number} value
     */
	public set $y(value: number) {
		this.y = value;
	}

    /**
     * Setter $mapId
     * @param {String} value
     */
	public set $mapId(value: String) {
		this.mapId = value;
	}

}