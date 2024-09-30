'use client'

import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import axios from 'axios';

type UserMainData = {
    id: number;
    userInfos: {
        firstName: string;
        lastName: string;
        age: number;
    };
    score: number;
    keyData: {
        calorieCount: number;
        proteinCount: number;
        carbohydrateCount: number;
        lipidCount: number;
    };
}

type UserActivity = {
    userId: number;
    sessions: {
        day: string;
        kilogram: number;
        calories: number;
    }[];
}

type UserAverageSessions = {
    userId: number;
    sessions: {
        day: number;
        sessionLength: number;
    }[];
}

type UserPerformance = {
    userId: number;
    kind: { [key: number]: string };
    data: {
        value: number;
        kind: number;
    }[];
}

export type UserData = {
    USER_MAIN_DATA: UserMainData;
    USER_ACTIVITY: UserActivity;
    USER_AVERAGE_SESSIONS: UserAverageSessions;
    USER_PERFORMANCE: UserPerformance;
};

type DataProviderProps = {
    children: ReactNode
}

type UserContextType = {
    userData: UserData | null;
    isFetchError: boolean;
}

const UserContext = createContext<UserContextType>({
    userData: null,
    isFetchError: false,
})

const sanitizeData = (data: any) => {
    const data2 = data;
    if (data2.todayScore) {
        data2.score = data.todayScore;
    }
    return data2 as UserMainData
}

export const DataProvider = ({ children }: DataProviderProps) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [error, setError] = useState(false)
    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        if (!userId) return

        const fetchData = async () => {
            try {
                const mainDataResponse = await axios.get<any>(`http://localhost:3000/user/${userId}`);
                const activityResponse = await axios.get<UserData['USER_ACTIVITY']>(`http://localhost:3000/user/${userId}/activity`);
                const averageSessionsResponse = await axios.get<UserData['USER_AVERAGE_SESSIONS']>(`http://localhost:3000/user/${userId}/average-sessions`);
                const performanceResponse = await axios.get<UserData['USER_PERFORMANCE']>(`http://localhost:3000/user/${userId}/performance`);

                const data: any = {
                    USER_MAIN_DATA: sanitizeData(mainDataResponse.data.data),
                    USER_ACTIVITY: activityResponse.data,
                    USER_AVERAGE_SESSIONS: averageSessionsResponse.data,
                    USER_PERFORMANCE: performanceResponse.data,
                };

                setUserData(data);

            } catch (error) {
                setError(true);
                console.log(error);
            }
        }
        fetchData();
    }, [userId]);

    return <UserContext.Provider value={{ userData, isFetchError: error }}>
        {children}
    </UserContext.Provider>
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a DataProvider');
    }
    return context;
};