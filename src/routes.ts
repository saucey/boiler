
export const routes = {
    home: () =>'/',
    login: () => 'login',
    register: () => 'register',
    editVRMs: (permitId: string) => `permit/${permitId}/editVrms`,
    cancelPermit: (permitId: string) => `permit/${permitId}/cancelPermit`,

    purchasePermit: () => 'purchase/intro',
    purchasePermitCity: () => 'purchase/city',
    purchasePermitSite: () => '/purchase/site',
    purchasePermitProduct: () => 'purchase/product',
    purchasePermitConfirmation: () => '/purchase/confirmation',

    management: () => '/management/permits',

    customers: () => '/customers',
    customerEdit: (customerId: string) => `/customers/${customerId}`,
    customerNew: () => '/customernew',

    products: () => '/products',
    productEdit: (productId: string) => `/products/${productId}`,
    productNew: () => '/productnew',

    permits: () => '/permits',
    permitEdit: (permitId: string) => `/permits/${permitId}`,
    permitNew: (customerId?: string, permitProductId?: string) => `/permitnew/${customerId}`,

    sites: () => '/sites',
    siteEdit: (siteId: string) => `/sites/${siteId}`,
    siteNew: () => '/sitenew',

    sitesHealth: () => '/sites-health',
    suspensions: () => '/suspensions',
};









































    // export const routes2 = {
    //     home: () =>'/',
    //     feedbackHome: () => '/feedback',
    //     feedbackEdit: (issueId: string) => `/feedback/issue/${issueId}`,
    //     feedbackNew: () => '/feedback/issue',
    //     generalHome: () => '/general',
    //     generalEdit: (issueld: string) => `general/issue/${issueld}`,
    //     generalNew: () => '/general/issue',
    //     viewAttachment: (path: string) => '/issue/attachment/${path}',
    //     feedbackBooking: (bookId: number, brandId: number) => `/feedback/issue?bookId=${bookId}&brandId=${brandId}`
    //     };