function getTime() {
    const now = new Date();
    return (
        now.getFullYear() +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        now.getDate().toString().padStart(2, '0') +
        '_' +
        now.getHours().toString().padStart(2, '0') +
        '' +
        now.getMinutes().toString().padStart(2, '0')
    );
}

module.exports = {
    getTime: getTime,
};
