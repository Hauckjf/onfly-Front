import { defineStore } from 'pinia'
import api from '../services/api'
import { ref } from 'vue'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

function showToast(message: string, type: 'success' | 'error' = 'success') {
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top',
    position: 'right',
    backgroundColor: type === 'success' ? '#4caf50' : '#f44336',
    close: true
  }).showToast();
}

interface Trip {
  id: number
  status: string
  destination: string
  startDate: string
  endDate: string
}

const trips = ref({ data: [] })

export const useTripsStore = defineStore('trips', {
  state: () => ({
    trips: [] as Trip[],
    currentTrip: null as Trip | null,
    loading: false,
  }),
  actions: {
    async fetchTrips(payload: { filters: any, paginate: boolean } | null) {
     
      try {
        const response = await api.post('/trips/index', payload)
        this.trips = response.data
        return trips.value;
      } catch (error) {
        console.error('Erro ao buscar viagens:', error)
      } 
    },
    async createTrip(tripData: Omit<Trip, 'id'>) {
      try {
        const response = await api.post('/trips', tripData)
        showToast('Viagem criada com sucesso!')
        this.fetchTrips(null);
        return response.data as Trip
      } catch (error: any) {
        throw error.response.data
      }
    },
    async updateTrip(id: number, tripData: Partial<Trip>) {
      try {
        const response = await api.put(`/trips/${id}`, tripData)
        showToast('Viagem atualizada com sucesso!')
        this.fetchTrips(null);
        return response.data as Trip
      } catch (error: any) {
        throw error.response.data
      }
    },
    async showTrip(id: number) {
      try {
        const response = await api.get(`/trips/${id}`)
        return response.data as Trip
      } catch (error: any) {
        return []
      }
    },
    async cancelTrip(id: number) {
      try {
        await api.put(`/trips/${id}/status`, { status: 'cancelado' })
        showToast('Viagem cancelada com sucesso!')
        this.fetchTrips(null);
      } catch (error: any) {
        throw error.response.data
      }
    },
    async approvedTrip(id: number) {
      try {
        await api.put(`/trips/${id}/status`, { status: 'aprovado' })
        showToast('Viagem aprovada com sucesso!')
        this.fetchTrips(null);
      } catch (error: any) {
        throw error.response.data
      }
    }
  }
})

