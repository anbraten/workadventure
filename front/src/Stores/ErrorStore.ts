import {writable} from "svelte/store";

/**
 * A store that contains a list of error messages to be displayed.
 */
function createErrorStore() {
    const { subscribe, set, update } = writable<string[]>([]);

    return {
        subscribe,
        addErrorMessage: (e: string|Error): void => {
            update((messages) => {
                messages.push(e.toString());
                return messages;
            });
        },
        clearMessages: (): void => {
            set([]);
        }
    };
}

export const errorStore = createErrorStore();