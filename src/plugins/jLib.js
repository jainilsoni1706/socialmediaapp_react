"use strict";

class jLib {

    static selectors = {
        class: ".",
        id: '#',
        data: '*',
        placeholder: '&',
        tag: '>',
    };

    static htmlElements = {
        div: 'div',
        span: 'span',
        p: 'p',
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        a: 'a',
        img: 'img',
        button: 'button',
        input: 'input',
        textarea: 'textarea',
        select: 'select',
        option: 'option',
        form: 'form',
        label: 'label',
        table: 'table',
        tr: 'tr',
        td: 'td',
        th: 'th',
        thead: 'thead',
        tbody: 'tbody',
        tfoot: 'tfoot',
        ul: 'ul',
        ol: 'ol',
        li: 'li',
        script: 'script',
        link: 'link',
        meta: 'meta',
        style: 'style',
        header: 'header',
        footer: 'footer',
        main: 'main',
        section: 'section',
        article: 'article',
        aside: 'aside',
        nav: 'nav',
        video: 'video',
        audio: 'audio',
        source: 'source',
        canvas: 'canvas',
        svg: 'svg',
        iframe: 'iframe',
        embed: 'embed',
        object: 'object',
    }

    static selectedElement = null;

    static dateCodes = {
        d: 'getDate',
        m: 'getMonth',
        y: 'getFullYear',
        h: 'getHours',
        i: 'getMinutes',
        s: 'getSeconds',
        w: 'getDay',
    };

    constructor(selectors = {}) {

        if(this.isObj(selectors) && !this.isArr(selectors) && !this.isEmptyObject(selectors)) {
            this.selectors = selectors;
        }

    }

    static elementSelectorParser(element) {
        if (this.isStr(element)) {
            let selectorOfArgument = element[0];
            if (Object.values(this.selectors).indexOf(selectorOfArgument) > -1) {
                return Object.keys(this.selectors)[Object.values(this.selectors).indexOf(selectorOfArgument)];
            } else {
                this.error('jLib : Invalid selector');
            }
        } else {
            this.error('jLib : Invalid argument passed');
        }
    }

    static on(eventName, element, callable) {
        this.eventPaser(this.replaceTheseFromString(this.selectors,"",element), this.elementSelectorParser(element),callable, eventName);
    }

    static eventPaser(element, selector, callable, event) {
        if (selector == 'class') {
            const allClasses = document.querySelectorAll(`.${element}`);
            for (let i = 0; i < allClasses.length; i++) {
                allClasses[i].addEventListener(event, callable);
            }
        } else if (selector == "id") {
            return document.getElementById(element).addEventListener(event, callable);
        } else if (selector == "tag") {
            const thisTag = document.querySelectorAll(`${element}`);
            for (let i = 0; i < thisTag.length; i++) {
                thisTag[i].addEventListener(event, callable);
            }
        }
    }

    static replaceTheseFromString(oldstr, newstr, element)
    {
        if (Array.isArray(oldstr)) {
            oldstr = oldstr;
        } else if (typeof oldstr == 'object') {
            oldstr = Object.values(oldstr);
        }

        for (let i = 0; i < oldstr.length; i++) {
            element = element.replace(oldstr[i], newstr);
        }

        return element;
    }

    static select(element) {
        this.selectedElement = {
            'elementType' : this.elementSelectorParser(element),
            'elementName' : this.replaceTheseFromString(this.selectors,"",element)
        };

        if (this.selectedElement.elementType == 'class') {            
            Object.assign( this.selectedElement, {'element' : document.querySelectorAll(`.${this.selectedElement.elementName}`)} );
        } else if (this.selectedElement.elementType == "id") {
            Object.assign( this.selectedElement, {'element' : document.querySelector(`#${this.selectedElement.elementName}`)} );
        } else if (this.selectedElement.elementType == "tag") {
            Object.assign( this.selectedElement, {'element' : document.querySelectorAll(`${this.selectedElement.elementName}`)} );
        }        

        return this;
    }

    static show() {
        for (let i = 0; i < this.selectedElement.element.length; i++) {
            this.selectedElement.element[i].style.display = "block";
        }
    }

    static hide() {
        for (let i = 0; i < this.selectedElement.element.length; i++) {
            this.selectedElement.element[i].style.display = "none";
        }
    }

    static style(styleObject) {
        if (this.isObj(styleObject) && !this.isArr(styleObject)) {
            if (!this.isEmptyObject(styleObject)) {
                for (let style in styleObject) {
                    for (let i = 0; i < this.selectedElement.element.length; i++) {
                        this.selectedElement.element[i].style[style] = styleObject[style];
                    }
                }
            } 
        } else {
            if (this.isNum(styleObject)) {
                return window.getComputedStyle(this.selectedElement.element[styleObject]);
            } else if (this.isStr(styleObject)) {
                let styles = {};
                for (let i = 0; i < this.selectedElement.element.length; i++) { 
                    styles[i] = window.getComputedStyle(this.selectedElement.element[i]).getPropertyValue(styleObject);
                }
                return styles;
            } else if (this.isArr(styleObject)) {
                return window.getComputedStyle(this.selectedElement.element[styleObject[0]]).getPropertyValue(styleObject[1]);
            } else {
                for (let i = 0; i < this.selectedElement.element.length; i++) {
                    return window.getComputedStyle(this.selectedElement.element[i]);
                }
            }
        }
    }


    // helper methods

    static date(argument) {
        if (!this.isUndefined(argument)) {

            let dateLetters = {};

            [...argument].forEach(element => {
                if (Object.values(this.dateCodes).indexOf(element) > -1) {
                    // work in progress
                }
            });


        } else {
            return new Date();
        }
    }


    static isObj(variable) {
        return typeof variable == 'object';
    }

    static isStr(variable) {
        return typeof variable == 'string';
    }

    static isNum(variable) {
        return typeof variable == 'number';
    }

    static isBool(variable) {
        return typeof variable == 'boolean';
    }

    static isArr(variable) {
        return Array.isArray(variable);
    }

    static isFunc(variable) {
        return typeof variable == 'function';
    }

    static isNull(variable) {
        return variable === null;
    }

    static isNotNull(variable) {
        return variable !== null;
    }

    static isEmpty(variable) {
        return variable === "";
    }

    static isEmptyObject(variable) {
        if (this.isObj(variable)) {
            return JSON.stringify(variable) === "{}";
        }
    }

    static isUndefined(variable) {
        return typeof variable == 'undefined';
    }

    static isNan(variable) {
        return isNaN(variable);
    }



    // debugging methods

    static log(...args) {
        console.log(...args);
    }

    static print(...args) {
        console.log(...args);
    }

    static error(...errors) {
        console.error(...errors);
    }

    static warning(...warnings) {
        console.warn(...warnings);
    }

}

