export class webPage {
    constructor(
        key,
        action,
        sidebar,
        className = null,
        children = []
    ) {
        this.key = key,
            this.action = action,
            this.sidebar = sidebar,
            this.className = className,
            this.children = children
    }
}