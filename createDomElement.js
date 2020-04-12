function createDomElement(tagName, id, className, targetForAppend, innerHTML) {
    const element = document.createElement(tagName);
    // id
    if (id) element.setAttribute('id', id);
    // classes
    if (Array.isArray(className)) {
        className.forEach((classTag) => { element.classList.add(classTag); });
    } else if (className) element.classList.add(className);
    // append to
    if (targetForAppend) targetForAppend.appendChild(element);
    // innerHTML
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
}

export default createDomElement;
