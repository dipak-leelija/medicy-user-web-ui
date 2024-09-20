import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import AddNewDistrbutor from '../../pages/pharmacy/purchases/purchase/AddNewDistrbutor';
import AddNewCustomer from '../../pages/pharmacy/sales/sale/AddNewCustomer';


interface Seller {
    id: number;
    name: string;
    item_name?: string;
    store?: string;
    unit?: string;
}

interface PurchaseItem {
    comp_1: string;
    comp_2: string;
    id: number;
    item_name: string;
    unit: string;
    qty: string;
}

interface stocks {
    bill_id: number;
    name: string;
}
interface SearchDropdownProps {
    sellers?: Seller[];
    sellerItemInput?: boolean,
    purchaseItems?: PurchaseItem[];
    stocks?: stocks[];
    onSelect: (id: number) => void;
    onAdd?: () => void; // Optional callback for the "Add" button
    onAddCustomer?: () => void;
    inputValue: string;
    setInputValue: (value: string) => void;
    searchType: 'id' | 'name';
    label: string;
    className: string;
    defaultDropDown?: boolean,
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ sellers,sellerItemInput, purchaseItems, stocks, onSelect, onAdd, onAddCustomer, inputValue, setInputValue, searchType, label, className, defaultDropDown }) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [filteredItems, setFilteredItems] = useState<(Seller | PurchaseItem | stocks)[]>([]);
    const [focusIndex, setFocusIndex] = useState<number>(-1);

    // show purchasereturn defaultDropDown 
    useEffect(() => {
        if (defaultDropDown) {
            setShowDropdown(true);
            if (purchaseItems) {
                setFilteredItems(purchaseItems);
            }
        }
    }, [defaultDropDown, purchaseItems]);// end purchasereturn defaultDropDown 

    const searchItems = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        if (value) {
            let filtered: (Seller | PurchaseItem | stocks)[] = [];

            if (sellers) {
                filtered = sellers.filter(seller =>
                    searchType === 'id'
                        ? seller.id.toString().includes(value)
                        : seller.name || seller.item_name?.toLowerCase().includes(value.toLowerCase())
                );
                console.log('Filtered Sellers:', filtered);
            } else if (purchaseItems) {
                filtered = purchaseItems.filter(item =>
                    searchType === 'id'
                        ? item.id.toString().includes(value)
                        : item.item_name?.toLowerCase().includes(value.toLowerCase())
                );
            } else if (stocks) {
                filtered = stocks.filter(stock =>
                    searchType === 'id'
                        ? stock.bill_id.toString().includes(value)
                        : stock.name?.toLowerCase().includes(value.toLowerCase())
                );
            }

            // setShowDropdown(true);
            setFilteredItems(filtered);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };

    const handleSelect = (selectedId: number) => {
        onSelect(selectedId);
        setShowDropdown(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setFocusIndex(prevIndex => Math.min(filteredItems.length - 1, prevIndex + 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setFocusIndex(prevIndex => Math.max(0, prevIndex - 1));
        } else if (event.key === 'Enter' && focusIndex >= 0) {
            event.preventDefault();
            // handleSelect((filteredItems[focusIndex] as Seller | PurchaseItem | stocks).id);
            const selectedItem = filteredItems[focusIndex];

            if ('id' in selectedItem) {
                handleSelect(selectedItem.id);
            } else if ('bill_id' in selectedItem) {
                handleSelect(selectedItem.bill_id);
            }
        }
    };

    return (
        <>
            <FloatingLabel controlId="floatingCustomer" label={label} className={className}>
                <Form.Control
                    type="text"
                    placeholder="Search Invoice No"
                    className='borderRemove bg-transparent'
                    value={inputValue}
                    onChange={searchItems}
                    onKeyDown={handleKeyDown}
                    // style={sellerItemInput ? {width:'150px'} : {width:'auto'}}
                />
            </FloatingLabel>
            {showDropdown && (
                <div className={stocks ? 'invoiceDropdown mt-1' : 'invoiceDropdown mt-1  w-75'}>
                    <div className='p-2 py-1 bg-secondary bg-opacity-25 text-dark'>
                        {searchType === 'id' ? 'Invoice Id' : (
                            <div className='row'>
                                {!stocks && <div className={purchaseItems ? "col-md-3" : "col-md-4"}>Searched For</div>}
                                {purchaseItems && <div className={purchaseItems ? "col-md-3" : "col-md-4"}>composition</div>}
                                {/* {sellers && <div className='col-md-6'>Stock</div>} */}
                                {!stocks && <div className={purchaseItems ? "col-md-3" : "col-md-4"}>Unit</div>}
                                {!stocks && <div className={purchaseItems ? "col-md-3" : "col-md-4"}>Stock</div>}

                            </div>
                        )}
                    </div>
                    <hr className='m-0 px-2' />
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                            <div
                                key={('id' in item ? item.id : (item as stocks).bill_id)}
                                className={`dropdown-item ${index === focusIndex ? 'focused' : ''}`}
                                onClick={() => {
                                    if ('id' in item) {
                                        handleSelect(item.id);
                                    } else if ('bill_id' in item) {
                                        handleSelect(item.bill_id);
                                    }
                                }}
                            >
                                {searchType === 'id' ? (
                                    // `${'id' in item ? item.id : (item as stocks).bill_id} - ${'name' in item ? item.name : (item as PurchaseItem).item_name}`
                                    <>
                                        <div className="col-md-3">{'id' in item ? item.id : (item as stocks).bill_id}</div>
                                        <div className="col-md-3">{'name' in item ? item.name : (item as PurchaseItem).item_name}</div>
                                    </>
                                ) : (
                                    <div className='row'>
                                        {/* {sellers && <div className='item-detail'>{'store' in item ? item.store || 'N/A' : 'N/A'}
                                        </div>} */}

                                        <div className={sellers ? "col-md-4 item-detail" : "col-md-3"}>
                                            {'name' in item ? item.name : (item as PurchaseItem).item_name}
                                        </div>
                                        {purchaseItems &&
                                            <>
                                                | <div className='col-md-3 item-detail'>
                                                    {'composition' in item ? (
                                                        <>
                                                            {item.composition || 'N/A'}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {(item as unknown as PurchaseItem).comp_1 || ''}
                                                            <br />
                                                            {(item as unknown as PurchaseItem).comp_2 || ''}
                                                        </>
                                                    )}
                                                </div> |
                                            </>}
                                        <div className='col-md-3 item-detail'>
                                            {'unit' in item ?
                                                `${item.unit || 'N/A'}` :
                                                `${(item as unknown as PurchaseItem).qty || ''}`
                                            }
                                        </div>
                                        {purchaseItems &&
                                            <>
                                                | <div className='col-md-2 item-detail'>
                                                    {'qty' in item ? item.qty : (item as unknown as PurchaseItem).qty}
                                                </div>
                                            </>
                                        }
                                    </div>
                                )}
                            </div>
                        ))

                    ) : (
                        <div className='dropdown-item text-center text-danger'>{searchType === 'id' ? `No ${label} Id found` : `No ${label} found`}</div>
                    )}

                    {filteredItems.length === 0 && (
                        <>
                            {stocks && onAdd && <AddNewDistrbutor />}
                            {stocks && onAddCustomer && <AddNewCustomer />}
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchDropdown;

