const version = 'V2.0.127';
const mainConfig = {
        isDebug: !1,
        author: "ddgksf2013",
        removeHomeVip: !0,
        removeHomeCreatorTask: !0,
        removeRelate: !0,
        removeGood: !0,
        removeFollow: !0,
        modifyMenus: !0,
        removeRelateItem: !1,
        removeRecommendItem: !0,
        removeRewardItem: !0,
        removeLiveMedia: !0,
        removeNextVideo: !1,
        removePinedTrending: !0,
        removeInterestFriendInTopic: !1,
        removeInterestTopic: !1,
        removeInterestUser: !0,
        removeLvZhou: !0,
        removeSearchWindow: !0,
        profileSkin1: null,
        profileSkin2: null,
        tabIconVersion: 0,
        tabIconPath: ""
    }, itemMenusConfig = {
        creator_task: !1,
        mblog_menus_custom: !1,
        mblog_menus_video_later: !0,
        mblog_menus_comment_manager: !0,
        mblog_menus_avatar_widget: !1,
        mblog_menus_card_bg: !1,
        mblog_menus_long_picture: !0,
        mblog_menus_delete: !0,
        mblog_menus_edit: !0,
        mblog_menus_edit_history: !0,
        mblog_menus_edit_video: !0,
        mblog_menus_sticking: !0,
        mblog_menus_open_reward: !0,
        mblog_menus_novelty: !1,
        mblog_menus_favorite: !0,
        mblog_menus_promote: !0,
        mblog_menus_modify_visible: !0,
        mblog_menus_copy_url: !0,
        mblog_menus_follow: !0,
        mblog_menus_video_feedback: !0,
        mblog_menus_shield: !0,
        mblog_menus_report: !0,
        mblog_menus_apeal: !0,
        mblog_menus_home: !0
    }, modifyCardsUrls = ["/cardlist", "video/community_tab", "searchall"],
    modifyStatusesUrls = ["statuses/friends/timeline", "statuses_unread_hot_timeline", "statuses/unread_friends_timeline", "statuses/unread_hot_timeline", "groups/timeline", "statuses/friends_timeline"],
    otherUrls = {
        "/profile/me": "removeHome",
        "/statuses/extend": "itemExtendHandler",
        "/video/remind_info": "removeVideoRemind",
        "/checkin/show": "removeCheckin",
        "/live/media_homelist": "removeMediaHomelist",
        "/comments/build_comments": "removeComments",
        "/container/get_item": "containerHandler",
        "/profile/container_timeline": "userHandler",
        "/video/tiny_stream_video_list": "nextVideoHandler",
        "/2/statuses/video_mixtimeline": "nextVideoHandler",
        "video/tiny_stream_mid_detail": "nextVideoHandler",
        "/!/client/light_skin": "tabSkinHandler",
        "/littleskin/preview": "skinPreviewHandler",
        "/search/finder": "removeSearchMain",
        "/search/container_timeline": "removeSearch",
        "/search/container_discover": "removeSearch",
        "/2/messageflow": "removeMsgAd",
        "/2/page?": "removePage",
        "/statuses/unread_topic_timeline": "topicHandler",
        "/square&pageDataType/": "squareHandler",
        "/statuses/container_timeline_topic": "removeMain",
        "/statuses/container_timeline": "removeMainTab",
        "wbapplua/wbpullad.lua": "removeLuaScreenAds",
        "interface/sdk/sdkad.php": "removePhpScreenAds",
        "a=trends": "removeTopics",
        user_center: "modifiedUserCenter",
        "a=get_coopen_ads": "removeIntlOpenAds",
        "php?a=search_topic": "removeSearchTopic",
        "v1/ad/realtime": "removeRealtimeAd",
        //"v1/ad/preload": "removeAdPreload",
        "v2/ad/preload": "removeAdPreload",
        "php?a=open_app": "removeAdBanner"
    };

function getModifyMethod(e) {
    for (let t of modifyCardsUrls) if (e.indexOf(t) > -1) return "removeCards";
    for (let o of modifyStatusesUrls) if (e.indexOf(o) > -1) return "removeTimeLine";
    for (let [i, a] of Object.entries(otherUrls)) if (e.indexOf(i) > -1) return a;
    return null
}

function removeRealtimeAd(e) {
    return delete e.ads, e.code = 4016, e
}

function removeAdBanner(e) {
    return e.data.close_ad_setting && delete e.data.close_ad_setting, e.data.detail_banner_ad && (e.data.detail_banner_ad = []), e
}

function removeAdPreload(e) {
    if (!e.ads) return e;
    for (let t of (e.last_ad_show_interval = 86400, e.ads)) t.start_time = 2681574400, t.end_time = 2681660799, t.display_duration = 0, t.daily_display_cnt = 0, t.total_display_cnt = 0;
    return e
}

function removeIntlOpenAds(e) {
    return e.data && 0 !== e.data.length && (e.data.ad_list = [], e.data.gdt_video_ad_ios = [], e.data.display_ad = 0, e.data.ad_ios_id = null, e.data.app_ad_ios_id = null, e.data.reserve_ad_ios_id = "", e.data.reserve_app_ad_ios_id = "", e.data.ad_duration = 604800, e.data.ad_cd_interval = 604800, e.data.pic_ad = []), e
}

function log(e) {
    mainConfig.isDebug && console.log(e)
}

var body = $response.body, url = $request.url;
let method = getModifyMethod(url);
if (method) {
    log(method);
    var func = eval(method);
    let data = JSON.parse(body.match(/\{.*\}/)[0]);
    new func(data), body = JSON.stringify(data), "removePhpScreenAds" == method && (body = JSON.stringify(data) + "OK")
}
$done({ body });
