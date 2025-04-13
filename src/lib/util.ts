const stringToDate = (dateString: string): Date => {
    return new Date(dateString)
}

const colorConverter = (color: "RED" | "YELLOW" | "GREEN" | "BLUE" | "PURPLE" | "GRAY" | "NONE"): string => {
    switch (color) {
        case "RED":
            return "#f87171"
        case "YELLOW":
            return "#fbbf24"
        case "GREEN":
            return "#34d399"
        case "BLUE":
            return "#60a5fa"
        case "PURPLE":
            return "#8b5cf6"
        case "GRAY":
            return "#6b7280"
        case "NONE":
            return "#d1d5db"
    }
}

export { stringToDate, colorConverter}