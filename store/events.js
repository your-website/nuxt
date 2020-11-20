import EventService from '../services/EventService'

export const state = () => ({
  events: [],
  event: {},
})

export const mutations = {
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT(state, event) {
    state.event = event
  },
}

export const actions = {
  async fetchEvents({ commit }) {
    const { data } = await EventService.getEvents()
    commit('SET_EVENTS', data)
  },
  async fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(+id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      const { data } = await EventService.getEvent(id)
      commit('ADD_EVENT', data)
    }
  },
}

export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id)
  },
}
