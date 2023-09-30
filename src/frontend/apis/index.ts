import { IBusAccount, IBusGroups, IBusRound } from "@/interface/bus";
import { IEvent } from "@/interface/events";
import { IResponse } from "@/interface/misc";
import { ToastProps, createStandaloneToast } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "../lib/axios";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

const { toast } = createStandaloneToast({
    defaultOptions: {
        duration: 2000,
        position: 'top-right',
        isClosable: true,
    },
});

const toastMessage: ToastProps = {
    position: 'top-right',
    duration: 9000,
    isClosable: true,
}


export function useBusGroups(type: string, enabled: boolean) {
    let token: string
    if (typeof window !== "undefined") {
        token = localStorage.getItem('auth_token') as string
    }
    const { error, ...rest } = useQuery<IResponse<IBusGroups[]>>(["bus-groups", { accountType: type }], async () => {
        const { data } = await axiosInstance.get(
            `${baseUrl}/api/bus-groups?type=${type}`
        );
        return data;
    }, { enabled });

    if (error) {
        toastMessage.title = (error as any).message || 'An error occurred'
        toastMessage.status = 'error'
        toast(toastMessage)
    }

    return { error, ...rest }
}

export function useBusAccount({ name, group }: { name: string, group: string }, enabled: boolean) {
    let token: string
    if (typeof window !== "undefined") {
        token = localStorage.getItem('auth_token') as string
    }
    const { error, ...rest } = useQuery<IResponse<IBusAccount[]>>(["bus-accounts", { name, group }], async () => {
        const { data } = await axios.get(
            `${baseUrl}/api/bus-accounts?name=${name}&group=${group}`, { headers: { 'Authorization': "Bearer " + token } }
        );
        return data;
    }, { enabled });

    if (error) {
        toastMessage.title = (error as any).message || 'An error occurred'
        toastMessage.status = 'error'
        toast(toastMessage)
    }

    return { error, ...rest }
}

export function useBusGroupTree(key: string, enabled: boolean) {
    let token: string
    if (typeof window !== "undefined") {
        token = localStorage.getItem('auth_token') as string
    }
    const { error, ...rest } = useQuery<IResponse<IBusGroups[]>>(["bus-group-tree", { group: key }], async () => {
        const { data } = await axiosInstance.get(
            `${baseUrl}/api/bus-groups/tree?_id=${key}`, { headers: { 'Authorization': "Bearer " + token } }
        );
        return data;
    }, { enabled });
    if (error) {
        const _error = error as any
        toastMessage.title = _error?.response?.data.message || _error.message || 'An error occurred'
        toastMessage.status = 'error'
        toast(toastMessage)
    }

    return { error, ...rest }
}

export function useActiveEvent(key: string, enabled: boolean) {
    let token: string
    if (typeof window !== "undefined") {
        token = localStorage.getItem('auth_token') as string
    }
    const { error, ...rest } = useQuery<IResponse<IEvent>>(["active-event", { group: key }], async () => {
        const { data } = await axios.post(
            `${baseUrl}/api/events/active`, { headers: { 'Authorization': "Bearer " + token } }
        );
        return data;
    }, { enabled });
    if (error) {
        const _error = error as any
        toastMessage.title = _error?.response?.data?.message || _error?.message || 'An error occurred'
        toastMessage.status = 'error'
        toast(toastMessage)
    }

    return { error, ...rest }
}

export const LoginRequest = <T>(payload: { email: string; password: string }) => {
    const response = axios.post(`/api/app-login`, payload)
    return response as T
}
export const addGroup = <T>(payload: { name: string; type: string; parent:string }[]) => {
    const response = axiosInstance.post(`/api/bus-groups`, payload)
    return response as T
}
