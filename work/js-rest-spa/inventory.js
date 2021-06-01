const items = {
    "1": {
        itemId: "1",
        name: "Stuffed Mouse",
        quantity: 3,
    },
    "2": {
        itemId: "2",
        name: "Laser Pointer",
        quantity: 1,
    },
    "4": {
        itemId: "4",
        name: "String",
        quantity: 2,
    },
    "5": {
        itemId: "5",
        name: "Squeaky Toy",
        quantity: 0,
    },
};

function checkExist(itemName) {
    const itemList = Object.values(items);
    for (let item of itemList) {
        if (itemName.toLowerCase() === item.name.toLowerCase()) {
            return true;
        }
    }
    return false;
};

const inventory = {
    items,
    checkExist,
};

module.exports = inventory;