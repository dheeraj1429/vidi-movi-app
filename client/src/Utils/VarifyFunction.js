export const VarifyEmail = function (email) {
    const splidData = email.split("");
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(pattern)) return false;

    return email;
};
