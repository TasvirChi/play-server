// ===================================================================================================
//                           _  __     _ _
//                          | |/ /__ _| | |_ _  _ _ _ __ _
//                          | ' </ _` | |  _| || | '_/ _` |
//                          |_|\_\__,_|_|\__|\_,_|_| \__,_|
//
// This file is part of the Borhan Collaborative Media Suite which allows users
// to do with audio, video, and animation what Wiki platfroms allow them to do with
// text.
//
// Copyright (C) 2006-2011  Borhan Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// @ignore
// ===================================================================================================

var BorhanAppearInListType = module.exports.BorhanAppearInListType = {
PARTNER_ONLY : 1,
CATEGORY_MEMBERS_ONLY : 3,
};

var BorhanAssetParamsOrigin = module.exports.BorhanAssetParamsOrigin = {
CONVERT : 0,
INGEST : 1,
CONVERT_WHEN_MISSING : 2,
};

var BorhanAssetStatus = module.exports.BorhanAssetStatus = {
ERROR : -1,
QUEUED : 0,
READY : 2,
DELETED : 3,
IMPORTING : 7,
EXPORTING : 9,
};

var BorhanAttachmentAssetStatus = module.exports.BorhanAttachmentAssetStatus = {
ERROR : -1,
QUEUED : 0,
READY : 2,
DELETED : 3,
IMPORTING : 7,
EXPORTING : 9,
};

var BorhanAuditTrailContext = module.exports.BorhanAuditTrailContext = {
CLIENT : -1,
SCRIPT : 0,
PS2 : 1,
API_V3 : 2,
};

var BorhanAuditTrailStatus = module.exports.BorhanAuditTrailStatus = {
PENDING : 1,
READY : 2,
FAILED : 3,
};

var BorhanBatchJobErrorTypes = module.exports.BorhanBatchJobErrorTypes = {
APP : 0,
RUNTIME : 1,
HTTP : 2,
CURL : 3,
BORHAN_API : 4,
BORHAN_CLIENT : 5,
};

var BorhanBatchJobStatus = module.exports.BorhanBatchJobStatus = {
PENDING : 0,
QUEUED : 1,
PROCESSING : 2,
PROCESSED : 3,
MOVEFILE : 4,
FINISHED : 5,
FAILED : 6,
ABORTED : 7,
ALMOST_DONE : 8,
RETRY : 9,
FATAL : 10,
DONT_PROCESS : 11,
FINISHED_PARTIALLY : 12,
};

var BorhanCaptionAssetStatus = module.exports.BorhanCaptionAssetStatus = {
ERROR : -1,
QUEUED : 0,
READY : 2,
DELETED : 3,
IMPORTING : 7,
EXPORTING : 9,
};

var BorhanCategoryEntryStatus = module.exports.BorhanCategoryEntryStatus = {
PENDING : 1,
ACTIVE : 2,
DELETED : 3,
REJECTED : 4,
};

var BorhanCategoryStatus = module.exports.BorhanCategoryStatus = {
UPDATING : 1,
ACTIVE : 2,
DELETED : 3,
PURGED : 4,
};

var BorhanCategoryUserPermissionLevel = module.exports.BorhanCategoryUserPermissionLevel = {
MANAGER : 0,
MODERATOR : 1,
CONTRIBUTOR : 2,
MEMBER : 3,
NONE : 4,
};

var BorhanCategoryUserStatus = module.exports.BorhanCategoryUserStatus = {
ACTIVE : 1,
PENDING : 2,
NOT_ACTIVE : 3,
DELETED : 4,
};

var BorhanContributionPolicyType = module.exports.BorhanContributionPolicyType = {
ALL : 1,
MEMBERS_WITH_CONTRIBUTION_PERMISSION : 2,
};

var BorhanControlPanelCommandStatus = module.exports.BorhanControlPanelCommandStatus = {
PENDING : 1,
HANDLED : 2,
DONE : 3,
FAILED : 4,
};

var BorhanControlPanelCommandTargetType = module.exports.BorhanControlPanelCommandTargetType = {
DATA_CENTER : 1,
SCHEDULER : 2,
JOB_TYPE : 3,
JOB : 4,
BATCH : 5,
};

var BorhanControlPanelCommandType = module.exports.BorhanControlPanelCommandType = {
KILL : 4,
};

var BorhanCuePointStatus = module.exports.BorhanCuePointStatus = {
READY : 1,
DELETED : 2,
HANDLED : 3,
};

var BorhanDVRStatus = module.exports.BorhanDVRStatus = {
DISABLED : 0,
ENABLED : 1,
};

var BorhanDistributionAction = module.exports.BorhanDistributionAction = {
SUBMIT : 1,
UPDATE : 2,
DELETE : 3,
FETCH_REPORT : 4,
};

var BorhanDistributionProfileStatus = module.exports.BorhanDistributionProfileStatus = {
DISABLED : 1,
ENABLED : 2,
DELETED : 3,
};

var BorhanDocumentType = module.exports.BorhanDocumentType = {
DOCUMENT : 11,
SWF : 12,
PDF : 13,
};

var BorhanDrmPolicyStatus = module.exports.BorhanDrmPolicyStatus = {
ACTIVE : 1,
DELETED : 2,
};

var BorhanDrmProfileStatus = module.exports.BorhanDrmProfileStatus = {
ACTIVE : 1,
DELETED : 2,
};

var BorhanDropFolderFileStatus = module.exports.BorhanDropFolderFileStatus = {
UPLOADING : 1,
PENDING : 2,
WAITING : 3,
HANDLED : 4,
IGNORE : 5,
DELETED : 6,
PURGED : 7,
NO_MATCH : 8,
ERROR_HANDLING : 9,
ERROR_DELETING : 10,
DOWNLOADING : 11,
ERROR_DOWNLOADING : 12,
PROCESSING : 13,
PARSED : 14,
DETECTED : 15,
};

var BorhanDropFolderStatus = module.exports.BorhanDropFolderStatus = {
DISABLED : 0,
ENABLED : 1,
DELETED : 2,
ERROR : 3,
};

var BorhanEditorType = module.exports.BorhanEditorType = {
SIMPLE : 1,
ADVANCED : 2,
};

var BorhanEntryDistributionFlag = module.exports.BorhanEntryDistributionFlag = {
NONE : 0,
SUBMIT_REQUIRED : 1,
DELETE_REQUIRED : 2,
UPDATE_REQUIRED : 3,
ENABLE_REQUIRED : 4,
DISABLE_REQUIRED : 5,
};

var BorhanEntryDistributionStatus = module.exports.BorhanEntryDistributionStatus = {
PENDING : 0,
QUEUED : 1,
READY : 2,
DELETED : 3,
SUBMITTING : 4,
UPDATING : 5,
DELETING : 6,
ERROR_SUBMITTING : 7,
ERROR_UPDATING : 8,
ERROR_DELETING : 9,
REMOVED : 10,
IMPORT_SUBMITTING : 11,
IMPORT_UPDATING : 12,
};

var BorhanEntryDistributionSunStatus = module.exports.BorhanEntryDistributionSunStatus = {
BEFORE_SUNRISE : 1,
AFTER_SUNRISE : 2,
AFTER_SUNSET : 3,
};

var BorhanEntryModerationStatus = module.exports.BorhanEntryModerationStatus = {
PENDING_MODERATION : 1,
APPROVED : 2,
REJECTED : 3,
FLAGGED_FOR_REVIEW : 5,
AUTO_APPROVED : 6,
};

var BorhanEventNotificationTemplateStatus = module.exports.BorhanEventNotificationTemplateStatus = {
DISABLED : 1,
ACTIVE : 2,
DELETED : 3,
};

var BorhanFileSyncStatus = module.exports.BorhanFileSyncStatus = {
ERROR : -1,
PENDING : 1,
READY : 2,
DELETED : 3,
PURGED : 4,
};

var BorhanFileSyncType = module.exports.BorhanFileSyncType = {
FILE : 1,
LINK : 2,
URL : 3,
};

var BorhanFlavorAssetStatus = module.exports.BorhanFlavorAssetStatus = {
ERROR : -1,
QUEUED : 0,
CONVERTING : 1,
READY : 2,
DELETED : 3,
NOT_APPLICABLE : 4,
TEMP : 5,
WAIT_FOR_CONVERT : 6,
IMPORTING : 7,
VALIDATING : 8,
EXPORTING : 9,
};

var BorhanFlavorReadyBehaviorType = module.exports.BorhanFlavorReadyBehaviorType = {
NO_IMPACT : 0,
INHERIT_FLAVOR_PARAMS : 0,
REQUIRED : 1,
OPTIONAL : 2,
};

var BorhanGenericDistributionProviderStatus = module.exports.BorhanGenericDistributionProviderStatus = {
ACTIVE : 2,
DELETED : 3,
};

var BorhanInheritanceType = module.exports.BorhanInheritanceType = {
INHERIT : 1,
MANUAL : 2,
};

var BorhanLicenseType = module.exports.BorhanLicenseType = {
UNKNOWN : -1,
NONE : 0,
COPYRIGHTED : 1,
PUBLIC_DOMAIN : 2,
CREATIVECOMMONS_ATTRIBUTION : 3,
CREATIVECOMMONS_ATTRIBUTION_SHARE_ALIKE : 4,
CREATIVECOMMONS_ATTRIBUTION_NO_DERIVATIVES : 5,
CREATIVECOMMONS_ATTRIBUTION_NON_COMMERCIAL : 6,
CREATIVECOMMONS_ATTRIBUTION_NON_COMMERCIAL_SHARE_ALIKE : 7,
CREATIVECOMMONS_ATTRIBUTION_NON_COMMERCIAL_NO_DERIVATIVES : 8,
GFDL : 9,
GPL : 10,
AFFERO_GPL : 11,
LGPL : 12,
BSD : 13,
APACHE : 14,
MOZILLA : 15,
};

var BorhanLivePublishStatus = module.exports.BorhanLivePublishStatus = {
DISABLED : 0,
ENABLED : 1,
};

var BorhanMediaType = module.exports.BorhanMediaType = {
VIDEO : 1,
IMAGE : 2,
AUDIO : 5,
LIVE_STREAM_FLASH : 201,
LIVE_STREAM_WINDOWS_MEDIA : 202,
LIVE_STREAM_REAL_MEDIA : 203,
LIVE_STREAM_QUICKTIME : 204,
};

var BorhanMetadataProfileCreateMode = module.exports.BorhanMetadataProfileCreateMode = {
API : 1,
BMC : 2,
APP : 3,
};

var BorhanMetadataProfileStatus = module.exports.BorhanMetadataProfileStatus = {
ACTIVE : 1,
DEPRECATED : 2,
TRANSFORMING : 3,
};

var BorhanMetadataStatus = module.exports.BorhanMetadataStatus = {
VALID : 1,
INVALID : 2,
DELETED : 3,
};

var BorhanNullableBoolean = module.exports.BorhanNullableBoolean = {
NULL_VALUE : -1,
FALSE_VALUE : 0,
TRUE_VALUE : 1,
};

var BorhanPartnerGroupType = module.exports.BorhanPartnerGroupType = {
PUBLISHER : 1,
VAR_GROUP : 2,
GROUP : 3,
TEMPLATE : 4,
};

var BorhanPartnerStatus = module.exports.BorhanPartnerStatus = {
DELETED : 0,
ACTIVE : 1,
BLOCKED : 2,
FULL_BLOCK : 3,
};

var BorhanPermissionStatus = module.exports.BorhanPermissionStatus = {
ACTIVE : 1,
BLOCKED : 2,
DELETED : 3,
};

var BorhanPermissionType = module.exports.BorhanPermissionType = {
NORMAL : 1,
SPECIAL_FEATURE : 2,
PLUGIN : 3,
PARTNER_GROUP : 4,
};

var BorhanPlaylistType = module.exports.BorhanPlaylistType = {
STATIC_LIST : 3,
DYNAMIC : 10,
EXTERNAL : 101,
};

var BorhanPrivacyType = module.exports.BorhanPrivacyType = {
ALL : 1,
AUTHENTICATED_USERS : 2,
MEMBERS_ONLY : 3,
};

var BorhanRecordStatus = module.exports.BorhanRecordStatus = {
DISABLED : 0,
ENABLED : 1,
};

var BorhanSearchOperatorType = module.exports.BorhanSearchOperatorType = {
SEARCH_AND : 1,
SEARCH_OR : 2,
};

var BorhanSearchProviderType = module.exports.BorhanSearchProviderType = {
FLICKR : 3,
YOUTUBE : 4,
MYSPACE : 7,
PHOTOBUCKET : 8,
JAMENDO : 9,
CCMIXTER : 10,
NYPL : 11,
CURRENT : 12,
MEDIA_COMMONS : 13,
BORHAN : 20,
BORHAN_USER_CLIPS : 21,
ARCHIVE_ORG : 22,
BORHAN_PARTNER : 23,
METACAFE : 24,
SEARCH_PROXY : 28,
PARTNER_SPECIFIC : 100,
};

var BorhanSessionType = module.exports.BorhanSessionType = {
USER : 0,
ADMIN : 2,
};

var BorhanShortLinkStatus = module.exports.BorhanShortLinkStatus = {
DISABLED : 1,
ENABLED : 2,
DELETED : 3,
};

var BorhanStorageProfileStatus = module.exports.BorhanStorageProfileStatus = {
DISABLED : 1,
AUTOMATIC : 2,
MANUAL : 3,
};

var BorhanThumbAssetStatus = module.exports.BorhanThumbAssetStatus = {
ERROR : -1,
QUEUED : 0,
CAPTURING : 1,
READY : 2,
DELETED : 3,
IMPORTING : 7,
EXPORTING : 9,
};

var BorhanUiConfCreationMode = module.exports.BorhanUiConfCreationMode = {
WIZARD : 2,
ADVANCED : 3,
};

var BorhanUiConfObjType = module.exports.BorhanUiConfObjType = {
PLAYER : 1,
CONTRIBUTION_WIZARD : 2,
SIMPLE_EDITOR : 3,
ADVANCED_EDITOR : 4,
PLAYLIST : 5,
APP_STUDIO : 6,
KRECORD : 7,
PLAYER_V3 : 8,
BMC_ACCOUNT : 9,
BMC_ANALYTICS : 10,
BMC_CONTENT : 11,
BMC_DASHBOARD : 12,
BMC_LOGIN : 13,
PLAYER_SL : 14,
CLIENTSIDE_ENCODER : 15,
BMC_GENERAL : 16,
BMC_ROLES_AND_PERMISSIONS : 17,
CLIPPER : 18,
KSR : 19,
KUPLOAD : 20,
};

var BorhanUpdateMethodType = module.exports.BorhanUpdateMethodType = {
MANUAL : 0,
AUTOMATIC : 1,
};

var BorhanUploadTokenStatus = module.exports.BorhanUploadTokenStatus = {
PENDING : 0,
PARTIAL_UPLOAD : 1,
FULL_UPLOAD : 2,
CLOSED : 3,
TIMED_OUT : 4,
DELETED : 5,
};

var BorhanUserRoleStatus = module.exports.BorhanUserRoleStatus = {
ACTIVE : 1,
BLOCKED : 2,
DELETED : 3,
};

var BorhanUserStatus = module.exports.BorhanUserStatus = {
BLOCKED : 0,
ACTIVE : 1,
DELETED : 2,
};

var BorhanVirusScanProfileStatus = module.exports.BorhanVirusScanProfileStatus = {
DISABLED : 1,
ENABLED : 2,
DELETED : 3,
};

var BorhanAccessControlOrderBy = module.exports.BorhanAccessControlOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var BorhanAccessControlProfileOrderBy = module.exports.BorhanAccessControlProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanAdCuePointOrderBy = module.exports.BorhanAdCuePointOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_TIME_ASC : "+endTime",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
START_TIME_ASC : "+startTime",
TRIGGERED_AT_ASC : "+triggeredAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_TIME_DESC : "-endTime",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
START_TIME_DESC : "-startTime",
TRIGGERED_AT_DESC : "-triggeredAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanAdProtocolType = module.exports.BorhanAdProtocolType = {
CUSTOM : "0",
VAST : "1",
VAST_2_0 : "2",
VPAID : "3",
};

var BorhanAdType = module.exports.BorhanAdType = {
VIDEO : "1",
OVERLAY : "2",
};

var BorhanAdminUserOrderBy = module.exports.BorhanAdminUserOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
};

var BorhanAmazonS3StorageProfileOrderBy = module.exports.BorhanAmazonS3StorageProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanAnnotationOrderBy = module.exports.BorhanAnnotationOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_TIME_ASC : "+endTime",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
START_TIME_ASC : "+startTime",
TRIGGERED_AT_ASC : "+triggeredAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_TIME_DESC : "-endTime",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
START_TIME_DESC : "-startTime",
TRIGGERED_AT_DESC : "-triggeredAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanApiActionPermissionItemOrderBy = module.exports.BorhanApiActionPermissionItemOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanApiParameterPermissionItemOrderBy = module.exports.BorhanApiParameterPermissionItemOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanAssetOrderBy = module.exports.BorhanAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
DELETED_AT_ASC : "+deletedAt",
SIZE_ASC : "+size",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DELETED_AT_DESC : "-deletedAt",
SIZE_DESC : "-size",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanAssetParamsOrderBy = module.exports.BorhanAssetParamsOrderBy = {
};

var BorhanAssetParamsOutputOrderBy = module.exports.BorhanAssetParamsOutputOrderBy = {
};

var BorhanAttachmentAssetOrderBy = module.exports.BorhanAttachmentAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
DELETED_AT_ASC : "+deletedAt",
SIZE_ASC : "+size",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DELETED_AT_DESC : "-deletedAt",
SIZE_DESC : "-size",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanAttachmentType = module.exports.BorhanAttachmentType = {
TEXT : "1",
MEDIA : "2",
DOCUMENT : "3",
};

var BorhanAuditTrailAction = module.exports.BorhanAuditTrailAction = {
CHANGED : "CHANGED",
CONTENT_VIEWED : "CONTENT_VIEWED",
COPIED : "COPIED",
CREATED : "CREATED",
DELETED : "DELETED",
FILE_SYNC_CREATED : "FILE_SYNC_CREATED",
RELATION_ADDED : "RELATION_ADDED",
RELATION_REMOVED : "RELATION_REMOVED",
VIEWED : "VIEWED",
};

var BorhanAuditTrailObjectType = module.exports.BorhanAuditTrailObjectType = {
BATCH_JOB : "BatchJob",
EMAIL_INGESTION_PROFILE : "EmailIngestionProfile",
FILE_SYNC : "FileSync",
KSHOW_KUSER : "KshowKuser",
METADATA : "Metadata",
METADATA_PROFILE : "MetadataProfile",
PARTNER : "Partner",
PERMISSION : "Permission",
UPLOAD_TOKEN : "UploadToken",
USER_LOGIN_DATA : "UserLoginData",
USER_ROLE : "UserRole",
ACCESS_CONTROL : "accessControl",
CATEGORY : "category",
CONVERSION_PROFILE_2 : "conversionProfile2",
ENTRY : "entry",
FLAVOR_ASSET : "flavorAsset",
FLAVOR_PARAMS : "flavorParams",
FLAVOR_PARAMS_CONVERSION_PROFILE : "flavorParamsConversionProfile",
FLAVOR_PARAMS_OUTPUT : "flavorParamsOutput",
KSHOW : "kshow",
KUSER : "kuser",
MEDIA_INFO : "mediaInfo",
MODERATION : "moderation",
ROUGHCUT : "roughcutEntry",
SYNDICATION : "syndicationFeed",
THUMBNAIL_ASSET : "thumbAsset",
THUMBNAIL_PARAMS : "thumbParams",
THUMBNAIL_PARAMS_OUTPUT : "thumbParamsOutput",
UI_CONF : "uiConf",
WIDGET : "widget",
};

var BorhanAuditTrailOrderBy = module.exports.BorhanAuditTrailOrderBy = {
CREATED_AT_ASC : "+createdAt",
PARSED_AT_ASC : "+parsedAt",
CREATED_AT_DESC : "-createdAt",
PARSED_AT_DESC : "-parsedAt",
};

var BorhanBaseEntryOrderBy = module.exports.BorhanBaseEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
END_DATE_ASC : "+endDate",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
END_DATE_DESC : "-endDate",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
WEIGHT_DESC : "-weight",
};

var BorhanBaseSyndicationFeedOrderBy = module.exports.BorhanBaseSyndicationFeedOrderBy = {
CREATED_AT_ASC : "+createdAt",
NAME_ASC : "+name",
PLAYLIST_ID_ASC : "+playlistId",
TYPE_ASC : "+type",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
NAME_DESC : "-name",
PLAYLIST_ID_DESC : "-playlistId",
TYPE_DESC : "-type",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanBatchJobOrderBy = module.exports.BorhanBatchJobOrderBy = {
CREATED_AT_ASC : "+createdAt",
ESTIMATED_EFFORT_ASC : "+estimatedEffort",
EXECUTION_ATTEMPTS_ASC : "+executionAttempts",
FINISH_TIME_ASC : "+finishTime",
LOCK_VERSION_ASC : "+lockVersion",
PRIORITY_ASC : "+priority",
QUEUE_TIME_ASC : "+queueTime",
STATUS_ASC : "+status",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ESTIMATED_EFFORT_DESC : "-estimatedEffort",
EXECUTION_ATTEMPTS_DESC : "-executionAttempts",
FINISH_TIME_DESC : "-finishTime",
LOCK_VERSION_DESC : "-lockVersion",
PRIORITY_DESC : "-priority",
QUEUE_TIME_DESC : "-queueTime",
STATUS_DESC : "-status",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanBatchJobType = module.exports.BorhanBatchJobType = {
PARSE_CAPTION_ASSET : "captionSearch.parseCaptionAsset",
DISTRIBUTION_DELETE : "contentDistribution.DistributionDelete",
DISTRIBUTION_DISABLE : "contentDistribution.DistributionDisable",
DISTRIBUTION_ENABLE : "contentDistribution.DistributionEnable",
DISTRIBUTION_FETCH_REPORT : "contentDistribution.DistributionFetchReport",
DISTRIBUTION_SUBMIT : "contentDistribution.DistributionSubmit",
DISTRIBUTION_SYNC : "contentDistribution.DistributionSync",
DISTRIBUTION_UPDATE : "contentDistribution.DistributionUpdate",
CONVERT : "0",
DROP_FOLDER_CONTENT_PROCESSOR : "dropFolder.DropFolderContentProcessor",
DROP_FOLDER_WATCHER : "dropFolder.DropFolderWatcher",
EVENT_NOTIFICATION_HANDLER : "eventNotification.EventNotificationHandler",
INDEX_TAGS : "tagSearch.IndexTagsByPrivacyContext",
TAG_RESOLVE : "tagSearch.TagResolve",
VIRUS_SCAN : "virusScan.VirusScan",
WIDEVINE_REPOSITORY_SYNC : "widevine.WidevineRepositorySync",
IMPORT : "1",
DELETE : "2",
FLATTEN : "3",
BULKUPLOAD : "4",
DVDCREATOR : "5",
DOWNLOAD : "6",
OOCONVERT : "7",
CONVERT_PROFILE : "10",
POSTCONVERT : "11",
EXTRACT_MEDIA : "14",
MAIL : "15",
NOTIFICATION : "16",
CLEANUP : "17",
SCHEDULER_HELPER : "18",
BULKDOWNLOAD : "19",
DB_CLEANUP : "20",
PROVISION_PROVIDE : "21",
CONVERT_COLLECTION : "22",
STORAGE_EXPORT : "23",
PROVISION_DELETE : "24",
STORAGE_DELETE : "25",
EMAIL_INGESTION : "26",
METADATA_IMPORT : "27",
METADATA_TRANSFORM : "28",
FILESYNC_IMPORT : "29",
CAPTURE_THUMB : "30",
DELETE_FILE : "31",
INDEX : "32",
MOVE_CATEGORY_ENTRIES : "33",
COPY : "34",
CONCAT : "35",
CONVERT_LIVE_SEGMENT : "36",
COPY_PARTNER : "37",
VALIDATE_LIVE_MEDIA_SERVERS : "38",
SYNC_CATEGORY_PRIVACY_CONTEXT : "39",
};

var BorhanBulkUploadObjectType = module.exports.BorhanBulkUploadObjectType = {
ENTRY : "1",
CATEGORY : "2",
USER : "3",
CATEGORY_USER : "4",
CATEGORY_ENTRY : "5",
};

var BorhanBulkUploadOrderBy = module.exports.BorhanBulkUploadOrderBy = {
};

var BorhanCaptionAssetOrderBy = module.exports.BorhanCaptionAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
DELETED_AT_ASC : "+deletedAt",
SIZE_ASC : "+size",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DELETED_AT_DESC : "-deletedAt",
SIZE_DESC : "-size",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanCaptionParamsOrderBy = module.exports.BorhanCaptionParamsOrderBy = {
};

var BorhanCaptionType = module.exports.BorhanCaptionType = {
SRT : "1",
DFXP : "2",
WEBVTT : "3",
};

var BorhanCategoryEntryAdvancedOrderBy = module.exports.BorhanCategoryEntryAdvancedOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var BorhanCategoryEntryOrderBy = module.exports.BorhanCategoryEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var BorhanCategoryOrderBy = module.exports.BorhanCategoryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DEPTH_ASC : "+depth",
DIRECT_ENTRIES_COUNT_ASC : "+directEntriesCount",
DIRECT_SUB_CATEGORIES_COUNT_ASC : "+directSubCategoriesCount",
ENTRIES_COUNT_ASC : "+entriesCount",
FULL_NAME_ASC : "+fullName",
MEMBERS_COUNT_ASC : "+membersCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DEPTH_DESC : "-depth",
DIRECT_ENTRIES_COUNT_DESC : "-directEntriesCount",
DIRECT_SUB_CATEGORIES_COUNT_DESC : "-directSubCategoriesCount",
ENTRIES_COUNT_DESC : "-entriesCount",
FULL_NAME_DESC : "-fullName",
MEMBERS_COUNT_DESC : "-membersCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanCategoryUserOrderBy = module.exports.BorhanCategoryUserOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanCodeCuePointOrderBy = module.exports.BorhanCodeCuePointOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_TIME_ASC : "+endTime",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
START_TIME_ASC : "+startTime",
TRIGGERED_AT_ASC : "+triggeredAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_TIME_DESC : "-endTime",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
START_TIME_DESC : "-startTime",
TRIGGERED_AT_DESC : "-triggeredAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanConfigurableDistributionProfileOrderBy = module.exports.BorhanConfigurableDistributionProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanContainerFormat = module.exports.BorhanContainerFormat = {
_3GP : "3gp",
APPLEHTTP : "applehttp",
AVI : "avi",
BMP : "bmp",
COPY : "copy",
FLV : "flv",
HLS : "hls",
ISMV : "ismv",
JPG : "jpg",
MKV : "mkv",
MOV : "mov",
MP3 : "mp3",
MP4 : "mp4",
MPEG : "mpeg",
MPEGTS : "mpegts",
OGG : "ogg",
OGV : "ogv",
PDF : "pdf",
PNG : "png",
SWF : "swf",
WAV : "wav",
WEBM : "webm",
WMA : "wma",
WMV : "wmv",
WVM : "wvm",
};

var BorhanControlPanelCommandOrderBy = module.exports.BorhanControlPanelCommandOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanConversionProfileAssetParamsOrderBy = module.exports.BorhanConversionProfileAssetParamsOrderBy = {
};

var BorhanConversionProfileOrderBy = module.exports.BorhanConversionProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var BorhanConversionProfileStatus = module.exports.BorhanConversionProfileStatus = {
DISABLED : "1",
ENABLED : "2",
DELETED : "3",
};

var BorhanConversionProfileType = module.exports.BorhanConversionProfileType = {
MEDIA : "1",
LIVE_STREAM : "2",
};

var BorhanCuePointOrderBy = module.exports.BorhanCuePointOrderBy = {
CREATED_AT_ASC : "+createdAt",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
START_TIME_ASC : "+startTime",
TRIGGERED_AT_ASC : "+triggeredAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
START_TIME_DESC : "-startTime",
TRIGGERED_AT_DESC : "-triggeredAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanCuePointType = module.exports.BorhanCuePointType = {
AD : "adCuePoint.Ad",
ANNOTATION : "annotation.Annotation",
CODE : "codeCuePoint.Code",
};

var BorhanDataEntryOrderBy = module.exports.BorhanDataEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
END_DATE_ASC : "+endDate",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
END_DATE_DESC : "-endDate",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
WEIGHT_DESC : "-weight",
};

var BorhanDistributionProfileOrderBy = module.exports.BorhanDistributionProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanDistributionProviderOrderBy = module.exports.BorhanDistributionProviderOrderBy = {
};

var BorhanDistributionProviderType = module.exports.BorhanDistributionProviderType = {
ATT_UVERSE : "attUverseDistribution.ATT_UVERSE",
AVN : "avnDistribution.AVN",
COMCAST_MRSS : "comcastMrssDistribution.COMCAST_MRSS",
CROSS_BORHAN : "crossBorhanDistribution.CROSS_BORHAN",
DAILYMOTION : "dailymotionDistribution.DAILYMOTION",
DOUBLECLICK : "doubleClickDistribution.DOUBLECLICK",
FREEWHEEL : "freewheelDistribution.FREEWHEEL",
FREEWHEEL_GENERIC : "freewheelGenericDistribution.FREEWHEEL_GENERIC",
FTP : "ftpDistribution.FTP",
FTP_SCHEDULED : "ftpDistribution.FTP_SCHEDULED",
HULU : "huluDistribution.HULU",
IDETIC : "ideticDistribution.IDETIC",
METRO_PCS : "metroPcsDistribution.METRO_PCS",
MSN : "msnDistribution.MSN",
NDN : "ndnDistribution.NDN",
PODCAST : "podcastDistribution.PODCAST",
QUICKPLAY : "quickPlayDistribution.QUICKPLAY",
SYNACOR_HBO : "synacorHboDistribution.SYNACOR_HBO",
TIME_WARNER : "timeWarnerDistribution.TIME_WARNER",
TVCOM : "tvComDistribution.TVCOM",
UVERSE_CLICK_TO_ORDER : "uverseClickToOrderDistribution.UVERSE_CLICK_TO_ORDER",
UVERSE : "uverseDistribution.UVERSE",
VERIZON_VCAST : "verizonVcastDistribution.VERIZON_VCAST",
YAHOO : "yahooDistribution.YAHOO",
YOUTUBE : "youTubeDistribution.YOUTUBE",
YOUTUBE_API : "youtubeApiDistribution.YOUTUBE_API",
GENERIC : "1",
SYNDICATION : "2",
};

var BorhanDocumentEntryOrderBy = module.exports.BorhanDocumentEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
END_DATE_ASC : "+endDate",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
END_DATE_DESC : "-endDate",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
WEIGHT_DESC : "-weight",
};

var BorhanDocumentFlavorParamsOrderBy = module.exports.BorhanDocumentFlavorParamsOrderBy = {
};

var BorhanDocumentFlavorParamsOutputOrderBy = module.exports.BorhanDocumentFlavorParamsOutputOrderBy = {
};

var BorhanDrmDeviceOrderBy = module.exports.BorhanDrmDeviceOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var BorhanDrmLicenseScenario = module.exports.BorhanDrmLicenseScenario = {
};

var BorhanDrmPolicyOrderBy = module.exports.BorhanDrmPolicyOrderBy = {
};

var BorhanDrmProfileOrderBy = module.exports.BorhanDrmProfileOrderBy = {
ID_ASC : "+id",
NAME_ASC : "+name",
ID_DESC : "-id",
NAME_DESC : "-name",
};

var BorhanDrmProviderType = module.exports.BorhanDrmProviderType = {
WIDEVINE : "widevine.WIDEVINE",
};

var BorhanDropFolderErrorCode = module.exports.BorhanDropFolderErrorCode = {
ERROR_CONNECT : "1",
ERROR_AUTENTICATE : "2",
ERROR_GET_PHISICAL_FILE_LIST : "3",
ERROR_GET_DB_FILE_LIST : "4",
DROP_FOLDER_APP_ERROR : "5",
CONTENT_MATCH_POLICY_UNDEFINED : "6",
};

var BorhanDropFolderFileErrorCode = module.exports.BorhanDropFolderFileErrorCode = {
ERROR_ADDING_BULK_UPLOAD : "dropFolderXmlBulkUpload.ERROR_ADDING_BULK_UPLOAD",
ERROR_ADD_CONTENT_RESOURCE : "dropFolderXmlBulkUpload.ERROR_ADD_CONTENT_RESOURCE",
ERROR_IN_BULK_UPLOAD : "dropFolderXmlBulkUpload.ERROR_IN_BULK_UPLOAD",
ERROR_WRITING_TEMP_FILE : "dropFolderXmlBulkUpload.ERROR_WRITING_TEMP_FILE",
LOCAL_FILE_WRONG_CHECKSUM : "dropFolderXmlBulkUpload.LOCAL_FILE_WRONG_CHECKSUM",
LOCAL_FILE_WRONG_SIZE : "dropFolderXmlBulkUpload.LOCAL_FILE_WRONG_SIZE",
MALFORMED_XML_FILE : "dropFolderXmlBulkUpload.MALFORMED_XML_FILE",
XML_FILE_SIZE_EXCEED_LIMIT : "dropFolderXmlBulkUpload.XML_FILE_SIZE_EXCEED_LIMIT",
ERROR_UPDATE_ENTRY : "1",
ERROR_ADD_ENTRY : "2",
FLAVOR_NOT_FOUND : "3",
FLAVOR_MISSING_IN_FILE_NAME : "4",
SLUG_REGEX_NO_MATCH : "5",
ERROR_READING_FILE : "6",
ERROR_DOWNLOADING_FILE : "7",
ERROR_UPDATE_FILE : "8",
ERROR_ADDING_CONTENT_PROCESSOR : "10",
ERROR_IN_CONTENT_PROCESSOR : "11",
ERROR_DELETING_FILE : "12",
FILE_NO_MATCH : "13",
};

var BorhanDropFolderFileHandlerType = module.exports.BorhanDropFolderFileHandlerType = {
XML : "dropFolderXmlBulkUpload.XML",
CONTENT : "1",
};

var BorhanDropFolderFileOrderBy = module.exports.BorhanDropFolderFileOrderBy = {
CREATED_AT_ASC : "+createdAt",
FILE_NAME_ASC : "+fileName",
FILE_SIZE_ASC : "+fileSize",
FILE_SIZE_LAST_SET_AT_ASC : "+fileSizeLastSetAt",
ID_ASC : "+id",
PARSED_FLAVOR_ASC : "+parsedFlavor",
PARSED_SLUG_ASC : "+parsedSlug",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
FILE_NAME_DESC : "-fileName",
FILE_SIZE_DESC : "-fileSize",
FILE_SIZE_LAST_SET_AT_DESC : "-fileSizeLastSetAt",
ID_DESC : "-id",
PARSED_FLAVOR_DESC : "-parsedFlavor",
PARSED_SLUG_DESC : "-parsedSlug",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanDropFolderOrderBy = module.exports.BorhanDropFolderOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanDropFolderType = module.exports.BorhanDropFolderType = {
WEBEX : "WebexDropFolder.WEBEX",
LOCAL : "1",
FTP : "2",
SCP : "3",
SFTP : "4",
S3 : "6",
};

var BorhanDurationType = module.exports.BorhanDurationType = {
LONG : "long",
MEDIUM : "medium",
NOT_AVAILABLE : "notavailable",
SHORT : "short",
};

var BorhanDynamicEnum = module.exports.BorhanDynamicEnum = {
};

var BorhanEmailNotificationTemplateOrderBy = module.exports.BorhanEmailNotificationTemplateOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanEntryAttendeeOrderBy = module.exports.BorhanEntryAttendeeOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanEntryAttendeeStatus = module.exports.BorhanEntryAttendeeStatus = {
PENDING : "1",
DELETED : "3",
};

var BorhanEntryDistributionOrderBy = module.exports.BorhanEntryDistributionOrderBy = {
CREATED_AT_ASC : "+createdAt",
SUBMITTED_AT_ASC : "+submittedAt",
SUNRISE_ASC : "+sunrise",
SUNSET_ASC : "+sunset",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
SUBMITTED_AT_DESC : "-submittedAt",
SUNRISE_DESC : "-sunrise",
SUNSET_DESC : "-sunset",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanEntryReplacementStatus = module.exports.BorhanEntryReplacementStatus = {
NONE : "0",
APPROVED_BUT_NOT_READY : "1",
READY_BUT_NOT_APPROVED : "2",
NOT_READY_AND_NOT_APPROVED : "3",
};

var BorhanEntryStatus = module.exports.BorhanEntryStatus = {
ERROR_IMPORTING : "-2",
ERROR_CONVERTING : "-1",
SCAN_FAILURE : "virusScan.ScanFailure",
IMPORT : "0",
INFECTED : "virusScan.Infected",
PRECONVERT : "1",
READY : "2",
DELETED : "3",
PENDING : "4",
MODERATE : "5",
BLOCKED : "6",
NO_CONTENT : "7",
};

var BorhanEntryType = module.exports.BorhanEntryType = {
AUTOMATIC : "-1",
EXTERNAL_MEDIA : "externalMedia.externalMedia",
MEDIA_CLIP : "1",
MIX : "2",
PLAYLIST : "5",
DATA : "6",
LIVE_STREAM : "7",
LIVE_CHANNEL : "8",
DOCUMENT : "10",
};

var BorhanEventNotificationTemplateOrderBy = module.exports.BorhanEventNotificationTemplateOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanEventNotificationTemplateType = module.exports.BorhanEventNotificationTemplateType = {
EMAIL : "emailNotification.Email",
HTTP : "httpNotification.Http",
};

var BorhanExternalMediaEntryOrderBy = module.exports.BorhanExternalMediaEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MEDIA_TYPE_ASC : "+mediaType",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MEDIA_TYPE_DESC : "-mediaType",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var BorhanExternalMediaSourceType = module.exports.BorhanExternalMediaSourceType = {
INTERCALL : "InterCall",
YOUTUBE : "YouTube",
};

var BorhanFileAssetObjectType = module.exports.BorhanFileAssetObjectType = {
UI_CONF : "2",
};

var BorhanFileAssetOrderBy = module.exports.BorhanFileAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanFileAssetStatus = module.exports.BorhanFileAssetStatus = {
PENDING : "0",
UPLOADING : "1",
READY : "2",
DELETED : "3",
ERROR : "4",
};

var BorhanFileSyncObjectType = module.exports.BorhanFileSyncObjectType = {
DISTRIBUTION_PROFILE : "contentDistribution.DistributionProfile",
ENTRY_DISTRIBUTION : "contentDistribution.EntryDistribution",
GENERIC_DISTRIBUTION_ACTION : "contentDistribution.GenericDistributionAction",
EMAIL_NOTIFICATION_TEMPLATE : "emailNotification.EmailNotificationTemplate",
HTTP_NOTIFICATION_TEMPLATE : "httpNotification.HttpNotificationTemplate",
ENTRY : "1",
UICONF : "2",
BATCHJOB : "3",
ASSET : "4",
FLAVOR_ASSET : "4",
METADATA : "5",
METADATA_PROFILE : "6",
SYNDICATION_FEED : "7",
CONVERSION_PROFILE : "8",
FILE_ASSET : "9",
};

var BorhanFileSyncOrderBy = module.exports.BorhanFileSyncOrderBy = {
CREATED_AT_ASC : "+createdAt",
FILE_SIZE_ASC : "+fileSize",
READY_AT_ASC : "+readyAt",
SYNC_TIME_ASC : "+syncTime",
UPDATED_AT_ASC : "+updatedAt",
VERSION_ASC : "+version",
CREATED_AT_DESC : "-createdAt",
FILE_SIZE_DESC : "-fileSize",
READY_AT_DESC : "-readyAt",
SYNC_TIME_DESC : "-syncTime",
UPDATED_AT_DESC : "-updatedAt",
VERSION_DESC : "-version",
};

var BorhanFlavorAssetOrderBy = module.exports.BorhanFlavorAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
DELETED_AT_ASC : "+deletedAt",
SIZE_ASC : "+size",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DELETED_AT_DESC : "-deletedAt",
SIZE_DESC : "-size",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanFlavorParamsOrderBy = module.exports.BorhanFlavorParamsOrderBy = {
};

var BorhanFlavorParamsOutputOrderBy = module.exports.BorhanFlavorParamsOutputOrderBy = {
};

var BorhanFtpDropFolderOrderBy = module.exports.BorhanFtpDropFolderOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanGenericDistributionProfileOrderBy = module.exports.BorhanGenericDistributionProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanGenericDistributionProviderActionOrderBy = module.exports.BorhanGenericDistributionProviderActionOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanGenericDistributionProviderOrderBy = module.exports.BorhanGenericDistributionProviderOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanGenericSyndicationFeedOrderBy = module.exports.BorhanGenericSyndicationFeedOrderBy = {
CREATED_AT_ASC : "+createdAt",
NAME_ASC : "+name",
PLAYLIST_ID_ASC : "+playlistId",
TYPE_ASC : "+type",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
NAME_DESC : "-name",
PLAYLIST_ID_DESC : "-playlistId",
TYPE_DESC : "-type",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanGenericXsltSyndicationFeedOrderBy = module.exports.BorhanGenericXsltSyndicationFeedOrderBy = {
CREATED_AT_ASC : "+createdAt",
NAME_ASC : "+name",
PLAYLIST_ID_ASC : "+playlistId",
TYPE_ASC : "+type",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
NAME_DESC : "-name",
PLAYLIST_ID_DESC : "-playlistId",
TYPE_DESC : "-type",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanGoogleVideoSyndicationFeedOrderBy = module.exports.BorhanGoogleVideoSyndicationFeedOrderBy = {
CREATED_AT_ASC : "+createdAt",
NAME_ASC : "+name",
PLAYLIST_ID_ASC : "+playlistId",
TYPE_ASC : "+type",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
NAME_DESC : "-name",
PLAYLIST_ID_DESC : "-playlistId",
TYPE_DESC : "-type",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanHttpNotificationTemplateOrderBy = module.exports.BorhanHttpNotificationTemplateOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanITunesSyndicationFeedOrderBy = module.exports.BorhanITunesSyndicationFeedOrderBy = {
CREATED_AT_ASC : "+createdAt",
NAME_ASC : "+name",
PLAYLIST_ID_ASC : "+playlistId",
TYPE_ASC : "+type",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
NAME_DESC : "-name",
PLAYLIST_ID_DESC : "-playlistId",
TYPE_DESC : "-type",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanImageFlavorParamsOrderBy = module.exports.BorhanImageFlavorParamsOrderBy = {
};

var BorhanImageFlavorParamsOutputOrderBy = module.exports.BorhanImageFlavorParamsOutputOrderBy = {
};

var BorhanKontikiStorageProfileOrderBy = module.exports.BorhanKontikiStorageProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanLanguage = module.exports.BorhanLanguage = {
AB : "Abkhazian",
AA : "Afar",
AF : "Afrikaans",
SQ : "Albanian",
AM : "Amharic",
AR : "Arabic",
HY : "Armenian",
AS_ : "Assamese",
AY : "Aymara",
AZ : "Azerbaijani",
BA : "Bashkir",
EU : "Basque",
BN : "Bengali (Bangla)",
DZ : "Bhutani",
BH : "Bihari",
BI : "Bislama",
BR : "Breton",
BG : "Bulgarian",
MY : "Burmese",
BE : "Byelorussian (Belarusian)",
KM : "Cambodian",
CA : "Catalan",
ZH : "Chinese",
CO : "Corsican",
HR : "Croatian",
CS : "Czech",
DA : "Danish",
NL : "Dutch",
EN : "English",
EO : "Esperanto",
ET : "Estonian",
FO : "Faeroese",
FA : "Farsi",
FJ : "Fiji",
FI : "Finnish",
FR : "French",
FY : "Frisian",
GV : "Gaelic (Manx)",
GD : "Gaelic (Scottish)",
GL : "Galician",
KA : "Georgian",
DE : "German",
EL : "Greek",
KL : "Greenlandic",
GN : "Guarani",
GU : "Gujarati",
HA : "Hausa",
IW : "Hebrew",
HE : "Hebrew",
HI : "Hindi",
HU : "Hungarian",
IS : "Icelandic",
IN : "Indonesian",
ID : "Indonesian",
IA : "Interlingua",
IE : "Interlingue",
IU : "Inuktitut",
IK : "Inupiak",
GA : "Irish",
IT : "Italian",
JA : "Japanese",
JV : "Javanese",
KN : "Kannada",
KS : "Kashmiri",
KK : "Kazakh",
RW : "Kinyarwanda (Ruanda)",
KY : "Kirghiz",
RN : "Kirundi (Rundi)",
KO : "Korean",
KU : "Kurdish",
LO : "Laothian",
LA : "Latin",
LV : "Latvian (Lettish)",
LI : "Limburgish ( Limburger)",
LN : "Lingala",
LT : "Lithuanian",
MK : "Macedonian",
MG : "Malagasy",
MS : "Malay",
ML : "Malayalam",
MT : "Maltese",
MI : "Maori",
MR : "Marathi",
MO : "Moldavian",
MN : "Mongolian",
NA : "Nauru",
NE : "Nepali",
NO : "Norwegian",
OC : "Occitan",
OR_ : "Oriya",
OM : "Oromo (Afan, Galla)",
PS : "Pashto (Pushto)",
PL : "Polish",
PT : "Portuguese",
PA : "Punjabi",
QU : "Quechua",
RM : "Rhaeto-Romance",
RO : "Romanian",
RU : "Russian",
SM : "Samoan",
SG : "Sangro",
SA : "Sanskrit",
SR : "Serbian",
SH : "Serbo-Croatian",
ST : "Sesotho",
TN : "Setswana",
SN : "Shona",
SD : "Sindhi",
SI : "Sinhalese",
SS : "Siswati",
SK : "Slovak",
SL : "Slovenian",
SO : "Somali",
ES : "Spanish",
SU : "Sundanese",
SW : "Swahili (Kiswahili)",
SV : "Swedish",
TL : "Tagalog",
TG : "Tajik",
TA : "Tamil",
TT : "Tatar",
TE : "Telugu",
TH : "Thai",
BO : "Tibetan",
TI : "Tigrinya",
TO : "Tonga",
TS : "Tsonga",
TR : "Turkish",
TK : "Turkmen",
TW : "Twi",
UG : "Uighur",
UK : "Ukrainian",
UR : "Urdu",
UZ : "Uzbek",
VI : "Vietnamese",
VO : "Volapuk",
CY : "Welsh",
WO : "Wolof",
XH : "Xhosa",
YI : "Yiddish",
JI : "Yiddish",
YO : "Yoruba",
ZU : "Zulu",
};

var BorhanLiveAssetOrderBy = module.exports.BorhanLiveAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
DELETED_AT_ASC : "+deletedAt",
SIZE_ASC : "+size",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DELETED_AT_DESC : "-deletedAt",
SIZE_DESC : "-size",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanLiveChannelOrderBy = module.exports.BorhanLiveChannelOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MEDIA_TYPE_ASC : "+mediaType",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MEDIA_TYPE_DESC : "-mediaType",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var BorhanLiveChannelSegmentOrderBy = module.exports.BorhanLiveChannelSegmentOrderBy = {
CREATED_AT_ASC : "+createdAt",
START_TIME_ASC : "+startTime",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
START_TIME_DESC : "-startTime",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanLiveChannelSegmentStatus = module.exports.BorhanLiveChannelSegmentStatus = {
ACTIVE : "2",
DELETED : "3",
};

var BorhanLiveEntryOrderBy = module.exports.BorhanLiveEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MEDIA_TYPE_ASC : "+mediaType",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MEDIA_TYPE_DESC : "-mediaType",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var BorhanLiveParamsOrderBy = module.exports.BorhanLiveParamsOrderBy = {
};

var BorhanLiveStreamAdminEntryOrderBy = module.exports.BorhanLiveStreamAdminEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MEDIA_TYPE_ASC : "+mediaType",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MEDIA_TYPE_DESC : "-mediaType",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var BorhanLiveStreamEntryOrderBy = module.exports.BorhanLiveStreamEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MEDIA_TYPE_ASC : "+mediaType",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MEDIA_TYPE_DESC : "-mediaType",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var BorhanMediaEntryOrderBy = module.exports.BorhanMediaEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MEDIA_TYPE_ASC : "+mediaType",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MEDIA_TYPE_DESC : "-mediaType",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var BorhanMediaFlavorParamsOrderBy = module.exports.BorhanMediaFlavorParamsOrderBy = {
};

var BorhanMediaFlavorParamsOutputOrderBy = module.exports.BorhanMediaFlavorParamsOutputOrderBy = {
};

var BorhanMediaInfoOrderBy = module.exports.BorhanMediaInfoOrderBy = {
};

var BorhanMediaServerOrderBy = module.exports.BorhanMediaServerOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanMetadataObjectType = module.exports.BorhanMetadataObjectType = {
AD_CUE_POINT : "adCuePointMetadata.AdCuePoint",
ANNOTATION : "annotationMetadata.Annotation",
CODE_CUE_POINT : "codeCuePointMetadata.CodeCuePoint",
ENTRY : "1",
CATEGORY : "2",
USER : "3",
PARTNER : "4",
};

var BorhanMetadataOrderBy = module.exports.BorhanMetadataOrderBy = {
CREATED_AT_ASC : "+createdAt",
METADATA_PROFILE_VERSION_ASC : "+metadataProfileVersion",
UPDATED_AT_ASC : "+updatedAt",
VERSION_ASC : "+version",
CREATED_AT_DESC : "-createdAt",
METADATA_PROFILE_VERSION_DESC : "-metadataProfileVersion",
UPDATED_AT_DESC : "-updatedAt",
VERSION_DESC : "-version",
};

var BorhanMetadataProfileOrderBy = module.exports.BorhanMetadataProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanMixEntryOrderBy = module.exports.BorhanMixEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var BorhanPartnerOrderBy = module.exports.BorhanPartnerOrderBy = {
ADMIN_EMAIL_ASC : "+adminEmail",
ADMIN_NAME_ASC : "+adminName",
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
STATUS_ASC : "+status",
WEBSITE_ASC : "+website",
ADMIN_EMAIL_DESC : "-adminEmail",
ADMIN_NAME_DESC : "-adminName",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
STATUS_DESC : "-status",
WEBSITE_DESC : "-website",
};

var BorhanPdfFlavorParamsOrderBy = module.exports.BorhanPdfFlavorParamsOrderBy = {
};

var BorhanPdfFlavorParamsOutputOrderBy = module.exports.BorhanPdfFlavorParamsOutputOrderBy = {
};

var BorhanPermissionItemOrderBy = module.exports.BorhanPermissionItemOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanPermissionItemType = module.exports.BorhanPermissionItemType = {
API_ACTION_ITEM : "kApiActionPermissionItem",
API_PARAMETER_ITEM : "kApiParameterPermissionItem",
};

var BorhanPermissionOrderBy = module.exports.BorhanPermissionOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanPlayableEntryOrderBy = module.exports.BorhanPlayableEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var BorhanPlaybackProtocol = module.exports.BorhanPlaybackProtocol = {
APPLE_HTTP : "applehttp",
AUTO : "auto",
AKAMAI_HD : "hdnetwork",
AKAMAI_HDS : "hdnetworkmanifest",
HDS : "hds",
HLS : "hls",
HTTP : "http",
MPEG_DASH : "mpegdash",
MULTICAST_SL : "multicast_silverlight",
RTMP : "rtmp",
RTSP : "rtsp",
SILVER_LIGHT : "sl",
};

var BorhanPlaylistOrderBy = module.exports.BorhanPlaylistOrderBy = {
CREATED_AT_ASC : "+createdAt",
END_DATE_ASC : "+endDate",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
END_DATE_DESC : "-endDate",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
WEIGHT_DESC : "-weight",
};

var BorhanRemoteDropFolderOrderBy = module.exports.BorhanRemoteDropFolderOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanReportOrderBy = module.exports.BorhanReportOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var BorhanScpDropFolderOrderBy = module.exports.BorhanScpDropFolderOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanSearchConditionComparison = module.exports.BorhanSearchConditionComparison = {
EQUAL : "1",
GREATER_THAN : "2",
GREATER_THAN_OR_EQUAL : "3",
LESS_THAN : "4",
LESS_THAN_OR_EQUAL : "5",
};

var BorhanSftpDropFolderOrderBy = module.exports.BorhanSftpDropFolderOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanShortLinkOrderBy = module.exports.BorhanShortLinkOrderBy = {
CREATED_AT_ASC : "+createdAt",
EXPIRES_AT_ASC : "+expiresAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
EXPIRES_AT_DESC : "-expiresAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanSourceType = module.exports.BorhanSourceType = {
LIMELIGHT_LIVE : "limeLight.LIVE_STREAM",
VELOCIX_LIVE : "velocix.VELOCIX_LIVE",
FILE : "1",
WEBCAM : "2",
URL : "5",
SEARCH_PROVIDER : "6",
AKAMAI_LIVE : "29",
MANUAL_LIVE_STREAM : "30",
AKAMAI_UNIVERSAL_LIVE : "31",
LIVE_STREAM : "32",
LIVE_CHANNEL : "33",
RECORDED_LIVE : "34",
CLIP : "35",
};

var BorhanSshDropFolderOrderBy = module.exports.BorhanSshDropFolderOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanStorageProfileOrderBy = module.exports.BorhanStorageProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanStorageProfileProtocol = module.exports.BorhanStorageProfileProtocol = {
KONTIKI : "kontiki.KONTIKI",
BORHAN_DC : "0",
FTP : "1",
SCP : "2",
SFTP : "3",
S3 : "6",
LOCAL : "7",
};

var BorhanSwfFlavorParamsOrderBy = module.exports.BorhanSwfFlavorParamsOrderBy = {
};

var BorhanSwfFlavorParamsOutputOrderBy = module.exports.BorhanSwfFlavorParamsOutputOrderBy = {
};

var BorhanSyndicationDistributionProfileOrderBy = module.exports.BorhanSyndicationDistributionProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanSyndicationDistributionProviderOrderBy = module.exports.BorhanSyndicationDistributionProviderOrderBy = {
};

var BorhanTaggedObjectType = module.exports.BorhanTaggedObjectType = {
ENTRY : "1",
CATEGORY : "2",
};

var BorhanThumbAssetOrderBy = module.exports.BorhanThumbAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
DELETED_AT_ASC : "+deletedAt",
SIZE_ASC : "+size",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DELETED_AT_DESC : "-deletedAt",
SIZE_DESC : "-size",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanThumbParamsOrderBy = module.exports.BorhanThumbParamsOrderBy = {
};

var BorhanThumbParamsOutputOrderBy = module.exports.BorhanThumbParamsOutputOrderBy = {
};

var BorhanTubeMogulSyndicationFeedOrderBy = module.exports.BorhanTubeMogulSyndicationFeedOrderBy = {
CREATED_AT_ASC : "+createdAt",
NAME_ASC : "+name",
PLAYLIST_ID_ASC : "+playlistId",
TYPE_ASC : "+type",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
NAME_DESC : "-name",
PLAYLIST_ID_DESC : "-playlistId",
TYPE_DESC : "-type",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanUiConfAdminOrderBy = module.exports.BorhanUiConfAdminOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanUiConfOrderBy = module.exports.BorhanUiConfOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanUploadTokenOrderBy = module.exports.BorhanUploadTokenOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var BorhanUserLoginDataOrderBy = module.exports.BorhanUserLoginDataOrderBy = {
};

var BorhanUserOrderBy = module.exports.BorhanUserOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
};

var BorhanUserRoleOrderBy = module.exports.BorhanUserRoleOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanVirusScanEngineType = module.exports.BorhanVirusScanEngineType = {
CLAMAV_SCAN_ENGINE : "clamAVScanEngine.ClamAV",
SYMANTEC_SCAN_DIRECT_ENGINE : "symantecScanEngine.SymantecScanDirectEngine",
SYMANTEC_SCAN_ENGINE : "symantecScanEngine.SymantecScanEngine",
SYMANTEC_SCAN_JAVA_ENGINE : "symantecScanEngine.SymantecScanJavaEngine",
};

var BorhanVirusScanProfileOrderBy = module.exports.BorhanVirusScanProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanWebexDropFolderFileOrderBy = module.exports.BorhanWebexDropFolderFileOrderBy = {
CREATED_AT_ASC : "+createdAt",
FILE_NAME_ASC : "+fileName",
FILE_SIZE_ASC : "+fileSize",
FILE_SIZE_LAST_SET_AT_ASC : "+fileSizeLastSetAt",
ID_ASC : "+id",
PARSED_FLAVOR_ASC : "+parsedFlavor",
PARSED_SLUG_ASC : "+parsedSlug",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
FILE_NAME_DESC : "-fileName",
FILE_SIZE_DESC : "-fileSize",
FILE_SIZE_LAST_SET_AT_DESC : "-fileSizeLastSetAt",
ID_DESC : "-id",
PARSED_FLAVOR_DESC : "-parsedFlavor",
PARSED_SLUG_DESC : "-parsedSlug",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanWebexDropFolderOrderBy = module.exports.BorhanWebexDropFolderOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanWidevineFlavorAssetOrderBy = module.exports.BorhanWidevineFlavorAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
DELETED_AT_ASC : "+deletedAt",
SIZE_ASC : "+size",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DELETED_AT_DESC : "-deletedAt",
SIZE_DESC : "-size",
UPDATED_AT_DESC : "-updatedAt",
};

var BorhanWidevineFlavorParamsOrderBy = module.exports.BorhanWidevineFlavorParamsOrderBy = {
};

var BorhanWidevineFlavorParamsOutputOrderBy = module.exports.BorhanWidevineFlavorParamsOutputOrderBy = {
};

var BorhanWidevineProfileOrderBy = module.exports.BorhanWidevineProfileOrderBy = {
ID_ASC : "+id",
NAME_ASC : "+name",
ID_DESC : "-id",
NAME_DESC : "-name",
};

var BorhanWidgetOrderBy = module.exports.BorhanWidgetOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var BorhanYahooSyndicationFeedOrderBy = module.exports.BorhanYahooSyndicationFeedOrderBy = {
CREATED_AT_ASC : "+createdAt",
NAME_ASC : "+name",
PLAYLIST_ID_ASC : "+playlistId",
TYPE_ASC : "+type",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
NAME_DESC : "-name",
PLAYLIST_ID_DESC : "-playlistId",
TYPE_DESC : "-type",
UPDATED_AT_DESC : "-updatedAt",
};
