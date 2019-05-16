export class DocumentFilter {
    public filterState?: boolean;
    public selectedDocTypes?: number[];
    public selectedDocStatuses?: number[];
    public selectedClients?: number[];
    public selectedSortType?: string;
    public selectedSortField?: string;
    public datedStart?: Date;
    public datedFinal?: Date;

    constructor(selectedDocTypes: number[], selectedDocStatuses: number[], selectedClients: number[], datedStart: Date, datedFinal: Date, selectedSortType: string, selectedSortField: string) {
        this.selectedDocTypes = selectedDocTypes;
        this.selectedDocStatuses = selectedDocStatuses;
        this.selectedClients = selectedClients;
        this.selectedSortType = selectedSortType;
        this.selectedSortField = selectedSortField;
        this.datedStart = datedStart;
        this.datedFinal = datedFinal;
    }

}
