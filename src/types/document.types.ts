export interface Document {
    doc_id: string;
    title: string;
    type: string;
    excel_type?: boolean;
    status?: DocumentStatus;
    pages: Page[];
}

export type DocumentStatus = 'reviewing' | 'approved' | 'rejected';

export interface Page {
    id: number;
    image: {
        height: number;
        url: string;
        width: number;
    };
}

export interface Section {
    id: number;
    title: string;
    type: string;
    children: Field[];
}

export interface Field {
    id: number;
    acc: number;
    content: {
        value: string;
        page: number;
        position: [number, number, number, number];
        review_required: boolean;
        is_valid_format: boolean;
    };
    order: number;
    label: string;
    type: string;
    no_items_row: number;
    format: string;
    ignore: boolean;
    color?: string;
}

export interface Highlight {
    id: number;
    page: number;
    position: [number, number, number, number];
    label?: string;
    color: string;
    isSelected?: boolean;
}
