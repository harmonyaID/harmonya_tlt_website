declare global {
    interface Window {
        // @ts-ignore
        globalBootstrap: any
    }
}

// @ts-ignore
const loadBootstrapHelper = async (): Promise<any> => {
    if (!window.globalBootstrap) {
        const dataBootstrap: any = await import(
            // @ts-ignore
            'bootstrap/dist/js/bootstrap.bundle.js'
        )
        window.globalBootstrap = dataBootstrap
    }
    return window.globalBootstrap
}

export default loadBootstrapHelper
