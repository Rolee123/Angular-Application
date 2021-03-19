export class Customers {
    constructor(
        public customer_id: string = '',
        public customer_name: string = '',
        public customer_mail: string = '',
        public customer_phone: number = null,
        public customer_reviews: string = '',
    ){}
    
}