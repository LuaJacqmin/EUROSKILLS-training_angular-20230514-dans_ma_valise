export interface valiseItem{
    name: String;
    isInValise: Boolean;
    place: String;
}

export interface allValiseItem{
    soute: Array<valiseItem>;
    main: Array<valiseItem>;
    cabine: Array<valiseItem>;
}