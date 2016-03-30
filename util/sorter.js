var sorter = function (entry1, entry2) {
    // This is a comparison function that will result in dates being sorted in DESC order.
    if (entry1._id > entry2._id) return 1;
    if (entry1._id < entry2._id) return -1;
    return 0;
};

module.exports = sorter;