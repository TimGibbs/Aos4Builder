import { useWindowSize } from "usehooks-ts"

const useIsMobile = (): boolean => {
    const { width = 0 } = useWindowSize()

    return width < 768
}

export default useIsMobile;