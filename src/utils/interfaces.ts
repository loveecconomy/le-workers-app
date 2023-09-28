export interface IMemberDetail {
    surname: string,
    otherName: string
    email: string,
    phoneNumber: string,
    otherNumber: string,
    maritalStatus: 'single' | 'married',
    position: 'member' | 'shepherd' | 'cell-shepherd' | 'pastor' | 'reverend'
}
export interface IMember {
    _id?: string
    details: IMemberDetail,
    group: string
    addedBy: string,
    created_on: string
}