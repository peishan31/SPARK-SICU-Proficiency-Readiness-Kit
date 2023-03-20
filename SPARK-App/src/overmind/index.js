import { createStateHook, createActionsHook, createEffectsHook } from 'overmind-react'
import { namespaced } from 'overmind/config'
import * as chapters from './chapters'
import * as user from './user'
import * as subchapters from './subchapters'


export const config = namespaced({
    chapters,
    user,
    subchapters
})

export const useAppState = createStateHook(config)
export const useActions = createActionsHook(config)
export const useEffects = createEffectsHook(config)

