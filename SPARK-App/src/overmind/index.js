import { createStateHook, createActionsHook, createEffectsHook } from 'overmind-react'
import { namespaced } from 'overmind/config'
import * as chapters from './chapters'
import * as user from './user'

export const config = namespaced({
    chapters,
    user
})

export const useAppState = createStateHook(config)
export const useActions = createActionsHook(config)
export const useEffects = createEffectsHook(config)

