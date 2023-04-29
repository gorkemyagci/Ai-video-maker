const arrowLeft = ({ size }) => {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
            <polygon points="15.54,21.151 5.095,12.229 15.54,3.309 16.19,4.069 6.635,12.229 16.19,20.39 "
                fill="currentColor" />
        </svg>
    )
}

const Icon = ({ name, size = 24 }) => {
    const icons = {
        arrowLeft: arrowLeft
    }
}

export default Icon