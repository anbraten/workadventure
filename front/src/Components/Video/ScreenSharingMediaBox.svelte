<script lang="ts">
    import { highlightedEmbedScreen } from "../../Stores/EmbedScreensStore";
    import type { EmbedScreen } from "../../Stores/EmbedScreensStore";
    import type { Streamable } from "../../Stores/StreamableCollectionStore";

    import type { ScreenSharingPeer } from "../../WebRtc/ScreenSharingPeer";
    import { getColorByString, srcObject, getTextColorByBackgroundColor } from "./utils";

    export let clickable = false;

    export let peer: ScreenSharingPeer;
    let streamStore = peer.streamStore;
    let name = peer.userName;
    let backGroundColor = getColorByString(peer.userName);
    let textColor = getTextColorByBackgroundColor(backGroundColor);
    let statusStore = peer.statusStore;

    let embedScreen: EmbedScreen;

    if (peer) {
        embedScreen = {
            type: "streamable",
            embed: peer as unknown as Streamable,
        };
    }
</script>

<div class="video-container">
    {#if $statusStore === "connecting"}
        <div class="connecting-spinner" />
    {/if}
    {#if $statusStore === "error"}
        <div class="rtc-error" />
    {/if}
    {#if $streamStore !== null}
        <i class="container">
            <span style="background-color: {backGroundColor}; color: {textColor};">{name}</span>
        </i>
        <!-- svelte-ignore a11y-media-has-caption -->
        <video
            use:srcObject={$streamStore}
            autoplay
            playsinline
            on:click={() => (clickable ? highlightedEmbedScreen.toggleHighlight(embedScreen) : null)}
        />

        <div class="video-controls">
            <div class="">Fullscreen</div>
            <div class="">Expand</div>
        </div>
    {/if}
</div>

<style lang="scss">
    .video-container {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: aqua;
        video {
           margin: auto;
           width: 100%;
        }

        .video-controls {
            display: flex;
            position: absolute;
            bottom: 0;
            right: 0;
        }

        i {
            span {
                padding: 2px 32px;
            }
        }
    }
</style>
