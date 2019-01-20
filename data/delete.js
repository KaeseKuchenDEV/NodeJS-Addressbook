function deleteAddress(addresses, id){
    const index = addresses.findIndex(addresses => addresses.id === parseInt(id), 10);
    addresses.splice(index, 1);
    return addresses;
}

module.exports = deleteAddress;