const isCommonPassword = password => {
    const commonPasswords = [
        '00000',
        '000000',
        '111111',
        '123123',
        '123321',
        '12345',
        '123456',
        '1234567',
        '12345678',
        '123456789',
        '1234567890',
        '54321',
        '654321',
        'aaron431',
        'abc123',
        'iloveyou',
        'Million2',
        'omgpop',
        'picture1',
        'password',
        'password1',
        'qqww1122',
        'qwerty',
        'senha',
    ];
    if (commonPasswords.includes(password)) {
        throw new Error(`Your password "${password}" is too common. Pick a more unique password.`);
    }
    return true;
};

module.exports = {
    isCommonPassword
};
