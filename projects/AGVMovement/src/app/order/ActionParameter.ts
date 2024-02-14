export class ActionParameter{
    private key: String;
    private value: String;


    constructor($key : String, $value : String){
        this.key = $key;
        this.value = $value;
    }


    /**
     * Getter $key
     * @return {String}
     */
	public get $key(): String {
		return this.key;
	}

    /**
     * Getter $value
     * @return {String}
     */
	public get $value(): String {
		return this.value;
	}

    /**
     * Setter $key
     * @param {String} value
     */
	public set $key(value: String) {
		this.key = value;
	}

    /**
     * Setter $value
     * @param {String} value
     */
	public set $value(value: String) {
		this.value = value;
	}


}