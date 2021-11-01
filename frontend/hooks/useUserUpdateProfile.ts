import { useCallback, useState } from "react";
import Constants from "../helpers/constants";
import Utilities from "../helpers/utilities";
import { User } from "../types/profile";

export declare interface UserUpdateProfileResult {
    updateProfile: (twitterHandle: string, user: User) => Promise<void>,
    errorMessage: string | null,
    isLoading: boolean
}

export const useUpdateProfile = (): UserUpdateProfileResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const updateProfile = useCallback(async (twitterHandle: string, user: User): Promise<void> => {
        try {
            setIsLoading(true);
            const { image, name, description } = user;
            await Utilities.putData(`${Constants.API}/user/${twitterHandle}`, {
                image, name, description
            });

            setErrorMessage(null);
        } catch (error) {
            setErrorMessage((error as Error)?.message || null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { updateProfile, errorMessage, isLoading };
};