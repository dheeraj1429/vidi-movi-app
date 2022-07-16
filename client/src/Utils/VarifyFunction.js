export const VarifyEmail = function (email) {
    const splidData = email.split("");
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(pattern)) return false;

    return email;
};

export const clientId = "293495706232-v2e80a9osn58vl4oh6h2qr6j6v22gki1.apps.googleusercontent.com";
export const userClientScret = "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";
