export interface Author {
    name: string;
    email: string;
}

export interface Stats {
    open_rate: number;
    click_rate: number;
}

export interface Newsletter {

    id: string;
    title: string;
    slug: string;
    author: Author;
    subject_line: string;
    preview_text: string;
    status: "sent" | "scheduled" | "draft";
    sent_at: string | null;
    subscriber_count: number;
    stats: Stats;
    tags: string[];

}