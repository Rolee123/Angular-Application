export class Carts {
    constructor(
        public product_id: number = null,
        public product_name: string = '',
        public product_type: string = '',
        public product_price: number = null,
        public product_tax: number = null,
        public product_image: string = '', 
        public product_quantity: number = null
    ) {}
}
