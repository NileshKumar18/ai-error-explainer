export const extractError = (error) => {
    const errorPatterns = [
        /(TypeError:.*)/gis,
        /(ReferenceError:.*)/gis,
        /(SyntaxError:.*)/gis,
        /(RangeError:.*)/gis,
        /(Error:.*)/gis,
    ];
    let extractedErrors = []

    for (const pattern of errorPatterns) {
        const matches = error.match(pattern)
        if (matches) {
            extractedErrors.push(...matches)
        }
    }
    if (extractedErrors.length === 0) {
        return error
    }
    return extractedErrors.join('\n')
}
