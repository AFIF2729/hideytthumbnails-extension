/** @typedef {import("./common")} */

const css = {
  "normal": "/* Nothing to do */",
  "hidden": `
ytd-thumbnail, ytd-playlist-thumbnail, .rich-thumbnail, .ytd-playlist-header-renderer.thumbnail-wrapper, #thumbnail, #video-preview, ytm-media-item .media-item-thumbnail-container, ytm-reel-item-renderer .video-thumbnail-container-vertical, ytm-playlist-video-renderer .compact-media-item-image, .ytp-videowall-still-image, .ytp-modern-videowall-still-image, .shortsLockupViewModelHostThumbnailContainer, .yt-lockup-view-model-wiz__content-image, #thumbnail-container, #text-image-container, .page-header-view-model-wiz__page-header-headline-image-hero-container, .yt-mini-game-card-view-model__thumbnail-wrapper, .ytd-display-ad-renderer #media-container, .ytwCompactLandscapeNoButtonLayoutViewModelHostImageHoverOverlayContainer, #card-thumbnail, yt-thumbnail-view-model {
  display: none !important;
}
ytm-reel-shelf-renderer .reel-shelf-items>* {
  height: auto !important;
  align-items: flex-start !important;
}
ytm-reel-item-renderer .reel-item-metadata {
  position: static !important;
}
.ytp-videowall-still-info-content, .ytp-modern-videowall-still-info-content {
  opacity: 1 !important;
}`,
  "hidden-except-hover": `
ytd-thumbnail, .yt-lockup-view-model-wiz__content-image, yt-thumbnail-view-model {
  transition: 0.25s ease-in all;
  overflow: hidden;
  max-height: inherit;
  max-width: inherit;
}

ytd-rich-item-renderer:not(:hover) ytd-thumbnail,
ytd-grid-video-renderer:not(:hover) ytd-thumbnail,
ytd-playlist-video-renderer:not(:hover) ytd-thumbnail,
ytd-rich-item-renderer:not(:hover) .yt-lockup-view-model-wiz__content-image,
ytd-ad-slot-renderer:not(:hover) #media-container.ytd-display-ad-renderer,
ytd-rich-item-renderer:not(:hover) yt-thumbnail-view-model,
ytm-shorts-lockup-view-model:not(:hover) .shortsLockupViewModelHostEndpoint.reel-item-endpoint {
  max-height: 0px !important;
  min-height: 0px !important;
  opacity: 0 !important;
}

ytd-ad-slot-renderer:not(:hover) #media-container.ytd-display-ad-renderer,
ytd-rich-item-renderer:not(:hover) yt-thumbnail-view-model {
  padding: 0 !important;
}

ytm-shorts-lockup-view-model:not(:hover) .yt-core-image {
  opacity: 0 !important;
}

ytd-playlist-video-renderer:not(:hover) ytd-thumbnail,
.ytd-item-section-renderer:not(:hover) ytd-thumbnail {
  max-width: 0px !important;
  min-width: 0px !important;
}

.ytd-ghost-grid-renderer.rich-thumbnail,
.skeleton-bg-color.rich-thumbnail,
.ytd-playlist-header-renderer.thumbnail-wrapper,
.ytp-videowall-still:not(:hover) .ytp-videowall-still-image,
.ytp-modern-videowall-still:not(:hover) .ytp-modern-videowall-still-image,
#video-preview {
  display: none !important;
}

.ytp-videowall-still-info-content,
.ytp-modern-videowall-still-info-content {
  opacity: 1 !important;
}`,
  "blurred": `ytd-thumbnail img, ytd-playlist-thumbnail img, .video-thumbnail-img, .ytp-videowall-still-image, .ytp-modern-videowall-still-image, ytm-shorts-lockup-view-model .yt-core-image, yt-img-shadow #img, .ytThumbnailViewModelImage .ytCoreImageHost, .shortsLockupViewModelHostThumbnail {
  filter: blur(16px);
}`,
  "solid-color": `
/* Background colors for solid color effect */
ytd-thumbnail,
yt-thumbnail-view-model,
.ytThumbnailViewModelImage,
ytm-shorts-lockup-view-model .shortsLockupViewModelHostThumbnailContainer,
#media-container,
.shortsLockupViewModelHostThumbnailContainer {
  background-color: var(--yt-spec-additive-background);
}

/* Hide images by default */
.yt-core-image,
.yt-thumbnail-view-model__image,
.ytThumbnailViewModelImage .ytCoreImageHost,
ytd-thumbnail .ytCoreImageHost,
.shortsLockupViewModelHostThumbnail,
#media-container #media,
#media-container #media-background {
  opacity: 0 !important;
  transition: opacity 0.25s ease-in-out;
}

/* Show images on hover */
ytd-thumbnail:hover .yt-core-image,
ytd-thumbnail:hover .ytCoreImageHost,
yt-thumbnail-view-model:hover .yt-thumbnail-view-model__image,
yt-thumbnail-view-model:hover .ytCoreImageHost,
.ytThumbnailViewModelImage:hover .ytCoreImageHost,
.shortsLockupViewModelHostThumbnailContainer:hover .shortsLockupViewModelHostThumbnail,
#media-container:hover #media,
#media-container:hover #media-background {
  opacity: 1 !important;
}

/* Specific styling for compact video renderer thumbnails */
ytd-thumbnail.style-scope.ytd-compact-video-renderer {
  border-radius: 1rem;
}

/* Video wall thumbnails */
.ytp-videowall-still-image,
.ytp-modern-videowall-still-image {
  position: relative !important;
}

.ytp-videowall-still-image::after,
.ytp-modern-videowall-still-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--yt-spec-static-overlay-filled-hover);
  z-index: 1;
  transition: opacity 0.25s ease-in-out;
  pointer-events: none;
}

.ytp-videowall-still:hover .ytp-videowall-still-image::after,
.ytp-modern-videowall-still:hover .ytp-modern-videowall-still-image::after {
  opacity: 0;
}

.ytp-videowall-still-info-content,
.ytp-modern-videowall-still-info-content {
  opacity: 1 !important;
}`,
};

const elem = document.createElement("style");
document.documentElement.appendChild(elem);

const updateElem = async () => {
  const options = await loadOptions()

  const isDisabled = options.disabledOnPages.everywhere
    || (options.disabledOnPages.results && window.location.pathname === '/results')
    || (options.disabledOnPages.channel && window.location.pathname.startsWith('/@'))
    || (options.disabledOnPages.playlist && window.location.pathname === '/playlist')
    || (options.disabledOnPages.watch && window.location.pathname === '/watch')
    || (options.disabledOnPages.subscriptions && window.location.pathname === '/feed/subscriptions');

  elem.innerHTML = `/* Injected by the Hide YouTube Thumbnails extension */
  ${css[isDisabled ? 'normal' : options.thumbnailMode]}`
}

// Update when settings are changed
browser.storage.onChanged.addListener(updateElem)

// Update when moving page
// Also see https://github.com/domdomegg/hideytthumbnails-extension/issues/17
// In future we should use the Navigation API when it's supported in Firefox
// https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API
let lastPathname = window.location.pathname;
setInterval(() => {
  if (lastPathname !== window.location.pathname) {
    lastPathname = window.location.pathname
    updateElem();
  }
}, 200);

// Initialize on load
updateElem()