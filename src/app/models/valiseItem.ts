export interface valiseItem{
    name: String;
    isInValise: Boolean;
}

export interface allValiseItem{
    soute: Array<valiseItem>;
    main: Array<valiseItem>;
    cabine: Array<valiseItem>;
}