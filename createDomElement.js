function createDomElement(tagName, id, className, targetForAppend, innerHTML) {
    const element = document.createElement(tagName);
    // id
    if (id) element.setAttribute('id', id);
    // classes
    if (!Array.isArray(className)) element.classList.add(className);
    else className.forEach((classTag) => { element.classList.add(classTag); });
    // append to
    if (targetForAppend) targetForAppend.appendChild(element);
    // innerHTML
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
}

export default createDomElement;
