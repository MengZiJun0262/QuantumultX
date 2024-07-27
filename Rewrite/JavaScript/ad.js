const otherUrls = {
    "wbapplua/wbpullad.lua": "removeLuaScreenAds",
    "interface/sdk/sdkad.php": "removePhpScreenAds",
    "a=trends": "removeTopics",
    "user_center": "modifiedUserCenter",
    "a=get_coopen_ads": "removeIntlOpenAds",
    "php?a=search_topic": "removeSearchTopic",
    "php?a=open_app": "removeAdBanner"
};
function removeLuaScreenAds(e) {
    if (!e.cached_ad) return e;
    for (let t of e.cached_ad.ads) t.start_date = 1893254400, t.show_count = 0, t.duration = 0, t.end_date = 1893340799;
    return e
}
function removePhpScreenAds(e) {
    if (!e.ads) return e;
    for (let t of (e.show_push_splash_ad = !1, e.background_delay_display_time = 0, e.lastAdShow_delay_display_time = 0, e.realtime_ad_video_stall_time = 0, e.realtime_ad_timeout_duration = 0, e.ads)) t.displaytime = 0, t.displayintervel = 86400, t.allowdaydisplaynum = 0, t.displaynum = 0, t.displaytime = 1, t.begintime = "2029-12-30 00:00:00", t.endtime = "2029-12-30 23:59:59";
    return e
}
function removeTopics(e) {
    return e.data && (e.data.order = ["search_topic"]), e
}
function modifiedUserCenter(e) {
    return e.data && 0 !== e.data.length && e.data.cards && (e.data.cards = Object.values(e.data.cards).filter(e => "personal_vip" != e.items[0].type)), e
}
function removeIntlOpenAds(e) {
    return e.data && 0 !== e.data.length && (e.data.ad_list = [], e.data.gdt_video_ad_ios = [], e.data.display_ad = 0, e.data.ad_ios_id = null, e.data.app_ad_ios_id = null, e.data.reserve_ad_ios_id = "", e.data.reserve_app_ad_ios_id = "", e.data.ad_duration = 604800, e.data.ad_cd_interval = 604800, e.data.pic_ad = []), e
}
function removeSearchTopic(e) {
    return e.data && 0 !== e.data.length && (e.data = Object.values(e.data).filter(e => "searchtop" != e.type)), e
}
function removeAdBanner(e) {
    return e.data.close_ad_setting && delete e.data.close_ad_setting, e.data.detail_banner_ad && (e.data.detail_banner_ad = []), e
}
function getModifyMethod(e) {
    for (let [i, a] of Object.entries(otherUrls)) if (e.indexOf(i) > -1) return a;
    return null
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
