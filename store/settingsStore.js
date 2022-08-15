import create from 'zustand'

const settingsStore = (set) => ({
    scrolltop: 0,
    setScrolltop:(val)=>set({scrolltop:val}),

    recfoll:'rec',
    setRecfoll:(val)=>set({recfoll:val}),

    type:'全部',
    setType:(val)=>set({type:val}),

})

const useSettingsStore = create(settingsStore)

export default useSettingsStore