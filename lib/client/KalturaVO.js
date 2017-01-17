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
var util = require('util');
var borhan = require('./BorhanClientBase');

/**
 */
function BorhanResource(){
  BorhanResource.super_.call(this);
};
module.exports.BorhanResource = BorhanResource;

util.inherits(BorhanResource, borhan.BorhanObjectBase);


/**
 */
function BorhanContentResource(){
  BorhanContentResource.super_.call(this);
};
module.exports.BorhanContentResource = BorhanContentResource;

util.inherits(BorhanContentResource, BorhanResource);


/**
 * @param  resource  BorhanContentResource    The content resource to associate with asset params
 *  	 .
 * @param  assetParamsId  int    The asset params to associate with the reaource
 *  	 .
 */
function BorhanAssetParamsResourceContainer(){
  BorhanAssetParamsResourceContainer.super_.call(this);
  this.resource = null;
  this.assetParamsId = null;
};
module.exports.BorhanAssetParamsResourceContainer = BorhanAssetParamsResourceContainer;

util.inherits(BorhanAssetParamsResourceContainer, BorhanResource);


/**
 */
function BorhanOperationAttributes(){
  BorhanOperationAttributes.super_.call(this);
};
module.exports.BorhanOperationAttributes = BorhanOperationAttributes;

util.inherits(BorhanOperationAttributes, borhan.BorhanObjectBase);


/**
 * @param  id  string    Auto generated 10 characters alphanumeric string
 *  	  (readOnly).
 * @param  name  string    Entry name (Min 1 chars)
 *  	 .
 * @param  description  string    Entry description
 *  	 .
 * @param  partnerId  int     (readOnly).
 * @param  userId  string    The ID of the user who is the owner of this entry 
 *  	 .
 * @param  creatorId  string    The ID of the user who created this entry 
 *  	  (insertOnly).
 * @param  tags  string    Entry tags
 *  	 .
 * @param  adminTags  string    Entry admin tags can be updated only by administrators
 *  	 .
 * @param  categories  string    Categories with no entitlement that this entry belongs to.
 *  	 .
 * @param  categoriesIds  string    Categories Ids of categories with no entitlement that this entry belongs to
 *  	 .
 * @param  status  string     (readOnly).
 * @param  moderationStatus  int    Entry moderation status
 *  	  (readOnly).
 * @param  moderationCount  int    Number of moderation requests waiting for this entry
 *  	  (readOnly).
 * @param  type  string    The type of the entry, this is auto filled by the derived entry object
 *  	 .
 * @param  createdAt  int    Entry creation date as Unix timestamp (In seconds)
 *  	  (readOnly).
 * @param  updatedAt  int    Entry update date as Unix timestamp (In seconds)
 *  	  (readOnly).
 * @param  rank  float    The calculated average rank. rank = totalRank / votes
 *  	  (readOnly).
 * @param  totalRank  int    The sum of all rank values submitted to the baseEntry.anonymousRank action
 *  	  (readOnly).
 * @param  votes  int    A count of all requests made to the baseEntry.anonymousRank action
 *  	  (readOnly).
 * @param  groupId  int    .
 * @param  partnerData  string    Can be used to store various partner related data as a string 
 *  	 .
 * @param  downloadUrl  string    Download URL for the entry
 *  	  (readOnly).
 * @param  searchText  string    Indexed search text for full text search
 *  	  (readOnly).
 * @param  licenseType  int    License type used for this entry
 *  	 .
 * @param  version  int    Version of the entry data
 *  	  (readOnly).
 * @param  thumbnailUrl  string    Thumbnail URL
 *  	  (insertOnly).
 * @param  accessControlId  int    The Access Control ID assigned to this entry (null when not set, send -1 to remove)  
 *  	 .
 * @param  startDate  int    Entry scheduling start date (null when not set, send -1 to remove)
 *  	 .
 * @param  endDate  int    Entry scheduling end date (null when not set, send -1 to remove)
 *  	 .
 * @param  referenceId  string    Entry external reference id
 *  	 .
 * @param  replacingEntryId  string    ID of temporary entry that will replace this entry when it's approved and ready for replacement
 *  	  (readOnly).
 * @param  replacedEntryId  string    ID of the entry that will be replaced when the replacement approved and this entry is ready
 *  	  (readOnly).
 * @param  replacementStatus  string    Status of the replacement readiness and approval
 *  	  (readOnly).
 * @param  partnerSortValue  int    Can be used to store various partner related data as a numeric value
 *  	 .
 * @param  conversionProfileId  int    Override the default ingestion profile  
 *  	 .
 * @param  redirectEntryId  string    IF not empty, points to an entry ID the should replace this current entry's id. 
 *  	 .
 * @param  rootEntryId  string    ID of source root entry, used for clipped, skipped and cropped entries that created from another entry
 *  	  (readOnly).
 * @param  operationAttributes  array    clipping, skipping and cropping attributes that used to create this entry  
 *  	 .
 * @param  entitledUsersEdit  string    list of user ids that are entitled to edit the entry (no server enforcement) The difference between entitledUsersEdit and entitledUsersPublish is applicative only
 *  	 .
 * @param  entitledUsersPublish  string    list of user ids that are entitled to publish the entry (no server enforcement) The difference between entitledUsersEdit and entitledUsersPublish is applicative only
 *  	 .
 */
function BorhanBaseEntry(){
  BorhanBaseEntry.super_.call(this);
  this.id = null;
  this.name = null;
  this.description = null;
  this.partnerId = null;
  this.userId = null;
  this.creatorId = null;
  this.tags = null;
  this.adminTags = null;
  this.categories = null;
  this.categoriesIds = null;
  this.status = null;
  this.moderationStatus = null;
  this.moderationCount = null;
  this.type = null;
  this.createdAt = null;
  this.updatedAt = null;
  this.rank = null;
  this.totalRank = null;
  this.votes = null;
  this.groupId = null;
  this.partnerData = null;
  this.downloadUrl = null;
  this.searchText = null;
  this.licenseType = null;
  this.version = null;
  this.thumbnailUrl = null;
  this.accessControlId = null;
  this.startDate = null;
  this.endDate = null;
  this.referenceId = null;
  this.replacingEntryId = null;
  this.replacedEntryId = null;
  this.replacementStatus = null;
  this.partnerSortValue = null;
  this.conversionProfileId = null;
  this.redirectEntryId = null;
  this.rootEntryId = null;
  this.operationAttributes = null;
  this.entitledUsersEdit = null;
  this.entitledUsersPublish = null;
};
module.exports.BorhanBaseEntry = BorhanBaseEntry;

util.inherits(BorhanBaseEntry, borhan.BorhanObjectBase);


/**
 * @param  id  string     (readOnly).
 * @param  cuePointType  string     (readOnly).
 * @param  status  int     (readOnly).
 * @param  entryId  string     (insertOnly).
 * @param  partnerId  int     (readOnly).
 * @param  createdAt  int     (readOnly).
 * @param  updatedAt  int     (readOnly).
 * @param  triggeredAt  int     (readOnly).
 * @param  tags  string    .
 * @param  startTime  int    Start time in milliseconds
 *  	 .
 * @param  userId  string     (readOnly).
 * @param  partnerData  string    .
 * @param  partnerSortValue  int    .
 * @param  forceStop  int    .
 * @param  thumbOffset  int    .
 * @param  systemName  string    .
 */
function BorhanCuePoint(){
  BorhanCuePoint.super_.call(this);
  this.id = null;
  this.cuePointType = null;
  this.status = null;
  this.entryId = null;
  this.partnerId = null;
  this.createdAt = null;
  this.updatedAt = null;
  this.triggeredAt = null;
  this.tags = null;
  this.startTime = null;
  this.userId = null;
  this.partnerData = null;
  this.partnerSortValue = null;
  this.forceStop = null;
  this.thumbOffset = null;
  this.systemName = null;
};
module.exports.BorhanCuePoint = BorhanCuePoint;

util.inherits(BorhanCuePoint, borhan.BorhanObjectBase);


/**
 * @param  objects  array     (readOnly).
 * @param  totalCount  int     (readOnly).
 */
function BorhanCuePointListResponse(){
  BorhanCuePointListResponse.super_.call(this);
  this.objects = null;
  this.totalCount = null;
};
module.exports.BorhanCuePointListResponse = BorhanCuePointListResponse;

util.inherits(BorhanCuePointListResponse, borhan.BorhanObjectBase);


/**
 */
function BorhanSearchItem(){
  BorhanSearchItem.super_.call(this);
};
module.exports.BorhanSearchItem = BorhanSearchItem;

util.inherits(BorhanSearchItem, borhan.BorhanObjectBase);


/**
 * @param  orderBy  string    .
 * @param  advancedSearch  BorhanSearchItem    .
 */
function BorhanFilter(){
  BorhanFilter.super_.call(this);
  this.orderBy = null;
  this.advancedSearch = null;
};
module.exports.BorhanFilter = BorhanFilter;

util.inherits(BorhanFilter, borhan.BorhanObjectBase);


/**
 * @param  pageSize  int    The number of objects to retrieve. (Default is 30, maximum page size is 500).
 *  	 .
 * @param  pageIndex  int    The page number for which {pageSize} of objects should be retrieved (Default is 1).
 *  	 .
 */
function BorhanFilterPager(){
  BorhanFilterPager.super_.call(this);
  this.pageSize = null;
  this.pageIndex = null;
};
module.exports.BorhanFilterPager = BorhanFilterPager;

util.inherits(BorhanFilterPager, borhan.BorhanObjectBase);


/**
 * @param  bitrate  int    .
 * @param  width  int    .
 * @param  height  int    .
 * @param  tags  string    .
 */
function BorhanLiveStreamBitrate(){
  BorhanLiveStreamBitrate.super_.call(this);
  this.bitrate = null;
  this.width = null;
  this.height = null;
  this.tags = null;
};
module.exports.BorhanLiveStreamBitrate = BorhanLiveStreamBitrate;

util.inherits(BorhanLiveStreamBitrate, borhan.BorhanObjectBase);


/**
 * @param  protocol  string    .
 * @param  url  string    .
 * @param  publishUrl  string    .
 */
function BorhanLiveStreamConfiguration(){
  BorhanLiveStreamConfiguration.super_.call(this);
  this.protocol = null;
  this.url = null;
  this.publishUrl = null;
};
module.exports.BorhanLiveStreamConfiguration = BorhanLiveStreamConfiguration;

util.inherits(BorhanLiveStreamConfiguration, borhan.BorhanObjectBase);


/**
 * @param  idEqual  string    This filter should be in use for retrieving only a specific entry (identified by its entryId).
 *  	 .
 * @param  idIn  string    This filter should be in use for retrieving few specific entries (string should include comma separated list of entryId strings).
 *  	 .
 * @param  idNotIn  string    .
 * @param  nameLike  string    This filter should be in use for retrieving specific entries. It should include only one string to search for in entry names (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  nameMultiLikeOr  string    This filter should be in use for retrieving specific entries. It could include few (comma separated) strings for searching in entry names, while applying an OR logic to retrieve entries that contain at least one input string (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  nameMultiLikeAnd  string    This filter should be in use for retrieving specific entries. It could include few (comma separated) strings for searching in entry names, while applying an AND logic to retrieve entries that contain all input strings (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  nameEqual  string    This filter should be in use for retrieving entries with a specific name.
 *  	 .
 * @param  partnerIdEqual  int    This filter should be in use for retrieving only entries which were uploaded by/assigned to users of a specific Borhan Partner (identified by Partner ID).
 *  	 .
 * @param  partnerIdIn  string    This filter should be in use for retrieving only entries within Borhan network which were uploaded by/assigned to users of few Borhan Partners  (string should include comma separated list of PartnerIDs)
 *  	 .
 * @param  userIdEqual  string    This filter parameter should be in use for retrieving only entries, uploaded by/assigned to a specific user (identified by user Id).
 *  	 .
 * @param  creatorIdEqual  string    .
 * @param  tagsLike  string    This filter should be in use for retrieving specific entries. It should include only one string to search for in entry tags (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  tagsMultiLikeOr  string    This filter should be in use for retrieving specific entries. It could include few (comma separated) strings for searching in entry tags, while applying an OR logic to retrieve entries that contain at least one input string (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  tagsMultiLikeAnd  string    This filter should be in use for retrieving specific entries. It could include few (comma separated) strings for searching in entry tags, while applying an AND logic to retrieve entries that contain all input strings (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  adminTagsLike  string    This filter should be in use for retrieving specific entries. It should include only one string to search for in entry tags set by an ADMIN user (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  adminTagsMultiLikeOr  string    This filter should be in use for retrieving specific entries. It could include few (comma separated) strings for searching in entry tags, set by an ADMIN user, while applying an OR logic to retrieve entries that contain at least one input string (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  adminTagsMultiLikeAnd  string    This filter should be in use for retrieving specific entries. It could include few (comma separated) strings for searching in entry tags, set by an ADMIN user, while applying an AND logic to retrieve entries that contain all input strings (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  categoriesMatchAnd  string    .
 * @param  categoriesMatchOr  string    All entries within these categories or their child categories.
 *  	 .
 * @param  categoriesNotContains  string    .
 * @param  categoriesIdsMatchAnd  string    .
 * @param  categoriesIdsMatchOr  string    All entries of the categories, excluding their child categories.
 *  	 To include entries of the child categories, use categoryAncestorIdIn, or categoriesMatchOr.
 *  	 .
 * @param  categoriesIdsNotContains  string    .
 * @param  categoriesIdsEmpty  int    .
 * @param  statusEqual  string    This filter should be in use for retrieving only entries, at a specific {.
 * @param  statusNotEqual  string    This filter should be in use for retrieving only entries, not at a specific {.
 * @param  statusIn  string    This filter should be in use for retrieving only entries, at few specific {.
 * @param  statusNotIn  string    This filter should be in use for retrieving only entries, not at few specific {.
 * @param  moderationStatusEqual  int    .
 * @param  moderationStatusNotEqual  int    .
 * @param  moderationStatusIn  string    .
 * @param  moderationStatusNotIn  string    .
 * @param  typeEqual  string    .
 * @param  typeIn  string    This filter should be in use for retrieving entries of few {.
 * @param  createdAtGreaterThanOrEqual  int    This filter parameter should be in use for retrieving only entries which were created at Borhan system after a specific time/date (standard timestamp format).
 *  	 .
 * @param  createdAtLessThanOrEqual  int    This filter parameter should be in use for retrieving only entries which were created at Borhan system before a specific time/date (standard timestamp format).
 *  	 .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  totalRankLessThanOrEqual  int    .
 * @param  totalRankGreaterThanOrEqual  int    .
 * @param  groupIdEqual  int    .
 * @param  searchTextMatchAnd  string    This filter should be in use for retrieving specific entries while search match the input string within all of the following metadata attributes: name, description, tags, adminTags.
 *  	 .
 * @param  searchTextMatchOr  string    This filter should be in use for retrieving specific entries while search match the input string within at least one of the following metadata attributes: name, description, tags, adminTags.
 *  	 .
 * @param  accessControlIdEqual  int    .
 * @param  accessControlIdIn  string    .
 * @param  startDateGreaterThanOrEqual  int    .
 * @param  startDateLessThanOrEqual  int    .
 * @param  startDateGreaterThanOrEqualOrNull  int    .
 * @param  startDateLessThanOrEqualOrNull  int    .
 * @param  endDateGreaterThanOrEqual  int    .
 * @param  endDateLessThanOrEqual  int    .
 * @param  endDateGreaterThanOrEqualOrNull  int    .
 * @param  endDateLessThanOrEqualOrNull  int    .
 * @param  referenceIdEqual  string    .
 * @param  referenceIdIn  string    .
 * @param  replacingEntryIdEqual  string    .
 * @param  replacingEntryIdIn  string    .
 * @param  replacedEntryIdEqual  string    .
 * @param  replacedEntryIdIn  string    .
 * @param  replacementStatusEqual  string    .
 * @param  replacementStatusIn  string    .
 * @param  partnerSortValueGreaterThanOrEqual  int    .
 * @param  partnerSortValueLessThanOrEqual  int    .
 * @param  rootEntryIdEqual  string    .
 * @param  rootEntryIdIn  string    .
 * @param  tagsNameMultiLikeOr  string    .
 * @param  tagsAdminTagsMultiLikeOr  string    .
 * @param  tagsAdminTagsNameMultiLikeOr  string    .
 * @param  tagsNameMultiLikeAnd  string    .
 * @param  tagsAdminTagsMultiLikeAnd  string    .
 * @param  tagsAdminTagsNameMultiLikeAnd  string    .
 */
function BorhanBaseEntryBaseFilter(){
  BorhanBaseEntryBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.idNotIn = null;
  this.nameLike = null;
  this.nameMultiLikeOr = null;
  this.nameMultiLikeAnd = null;
  this.nameEqual = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.userIdEqual = null;
  this.creatorIdEqual = null;
  this.tagsLike = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.adminTagsLike = null;
  this.adminTagsMultiLikeOr = null;
  this.adminTagsMultiLikeAnd = null;
  this.categoriesMatchAnd = null;
  this.categoriesMatchOr = null;
  this.categoriesNotContains = null;
  this.categoriesIdsMatchAnd = null;
  this.categoriesIdsMatchOr = null;
  this.categoriesIdsNotContains = null;
  this.categoriesIdsEmpty = null;
  this.statusEqual = null;
  this.statusNotEqual = null;
  this.statusIn = null;
  this.statusNotIn = null;
  this.moderationStatusEqual = null;
  this.moderationStatusNotEqual = null;
  this.moderationStatusIn = null;
  this.moderationStatusNotIn = null;
  this.typeEqual = null;
  this.typeIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.totalRankLessThanOrEqual = null;
  this.totalRankGreaterThanOrEqual = null;
  this.groupIdEqual = null;
  this.searchTextMatchAnd = null;
  this.searchTextMatchOr = null;
  this.accessControlIdEqual = null;
  this.accessControlIdIn = null;
  this.startDateGreaterThanOrEqual = null;
  this.startDateLessThanOrEqual = null;
  this.startDateGreaterThanOrEqualOrNull = null;
  this.startDateLessThanOrEqualOrNull = null;
  this.endDateGreaterThanOrEqual = null;
  this.endDateLessThanOrEqual = null;
  this.endDateGreaterThanOrEqualOrNull = null;
  this.endDateLessThanOrEqualOrNull = null;
  this.referenceIdEqual = null;
  this.referenceIdIn = null;
  this.replacingEntryIdEqual = null;
  this.replacingEntryIdIn = null;
  this.replacedEntryIdEqual = null;
  this.replacedEntryIdIn = null;
  this.replacementStatusEqual = null;
  this.replacementStatusIn = null;
  this.partnerSortValueGreaterThanOrEqual = null;
  this.partnerSortValueLessThanOrEqual = null;
  this.rootEntryIdEqual = null;
  this.rootEntryIdIn = null;
  this.tagsNameMultiLikeOr = null;
  this.tagsAdminTagsMultiLikeOr = null;
  this.tagsAdminTagsNameMultiLikeOr = null;
  this.tagsNameMultiLikeAnd = null;
  this.tagsAdminTagsMultiLikeAnd = null;
  this.tagsAdminTagsNameMultiLikeAnd = null;
};
module.exports.BorhanBaseEntryBaseFilter = BorhanBaseEntryBaseFilter;

util.inherits(BorhanBaseEntryBaseFilter, BorhanFilter);


/**
 * @param  freeText  string    .
 * @param  isRoot  int    .
 * @param  categoriesFullNameIn  string    .
 * @param  categoryAncestorIdIn  string    All entries within this categoy or in child categories  
 *  	 .
 * @param  redirectFromEntryId  string    The id of the original entry
 *  	 .
 */
function BorhanBaseEntryFilter(){
  BorhanBaseEntryFilter.super_.call(this);
  this.freeText = null;
  this.isRoot = null;
  this.categoriesFullNameIn = null;
  this.categoryAncestorIdIn = null;
  this.redirectFromEntryId = null;
};
module.exports.BorhanBaseEntryFilter = BorhanBaseEntryFilter;

util.inherits(BorhanBaseEntryFilter, BorhanBaseEntryBaseFilter);


/**
 * @param  lastPlayedAtGreaterThanOrEqual  int    .
 * @param  lastPlayedAtLessThanOrEqual  int    .
 * @param  durationLessThan  int    .
 * @param  durationGreaterThan  int    .
 * @param  durationLessThanOrEqual  int    .
 * @param  durationGreaterThanOrEqual  int    .
 * @param  durationTypeMatchOr  string    .
 */
function BorhanPlayableEntryBaseFilter(){
  BorhanPlayableEntryBaseFilter.super_.call(this);
  this.lastPlayedAtGreaterThanOrEqual = null;
  this.lastPlayedAtLessThanOrEqual = null;
  this.durationLessThan = null;
  this.durationGreaterThan = null;
  this.durationLessThanOrEqual = null;
  this.durationGreaterThanOrEqual = null;
  this.durationTypeMatchOr = null;
};
module.exports.BorhanPlayableEntryBaseFilter = BorhanPlayableEntryBaseFilter;

util.inherits(BorhanPlayableEntryBaseFilter, BorhanBaseEntryFilter);


/**
 */
function BorhanPlayableEntryFilter(){
  BorhanPlayableEntryFilter.super_.call(this);
};
module.exports.BorhanPlayableEntryFilter = BorhanPlayableEntryFilter;

util.inherits(BorhanPlayableEntryFilter, BorhanPlayableEntryBaseFilter);


/**
 * @param  mediaTypeEqual  int    .
 * @param  mediaTypeIn  string    .
 * @param  mediaDateGreaterThanOrEqual  int    .
 * @param  mediaDateLessThanOrEqual  int    .
 * @param  flavorParamsIdsMatchOr  string    .
 * @param  flavorParamsIdsMatchAnd  string    .
 */
function BorhanMediaEntryBaseFilter(){
  BorhanMediaEntryBaseFilter.super_.call(this);
  this.mediaTypeEqual = null;
  this.mediaTypeIn = null;
  this.mediaDateGreaterThanOrEqual = null;
  this.mediaDateLessThanOrEqual = null;
  this.flavorParamsIdsMatchOr = null;
  this.flavorParamsIdsMatchAnd = null;
};
module.exports.BorhanMediaEntryBaseFilter = BorhanMediaEntryBaseFilter;

util.inherits(BorhanMediaEntryBaseFilter, BorhanPlayableEntryFilter);


/**
 */
function BorhanMediaEntryFilter(){
  BorhanMediaEntryFilter.super_.call(this);
};
module.exports.BorhanMediaEntryFilter = BorhanMediaEntryFilter;

util.inherits(BorhanMediaEntryFilter, BorhanMediaEntryBaseFilter);


/**
 * @param  limit  int    .
 */
function BorhanMediaEntryFilterForPlaylist(){
  BorhanMediaEntryFilterForPlaylist.super_.call(this);
  this.limit = null;
};
module.exports.BorhanMediaEntryFilterForPlaylist = BorhanMediaEntryFilterForPlaylist;

util.inherits(BorhanMediaEntryFilterForPlaylist, BorhanMediaEntryFilter);

/**
 * @param  id  int     (readOnly).
 * @param  partnerId  int     (readOnly).
 * @param  metadataProfileId  int     (readOnly).
 * @param  metadataProfileVersion  int     (readOnly).
 * @param  metadataObjectType  string     (readOnly).
 * @param  objectId  string     (readOnly).
 * @param  version  int     (readOnly).
 * @param  createdAt  int     (readOnly).
 * @param  updatedAt  int     (readOnly).
 * @param  status  int     (readOnly).
 * @param  xml  string     (readOnly).
 */
function BorhanMetadata(){
  BorhanMetadata.super_.call(this);
  this.id = null;
  this.partnerId = null;
  this.metadataProfileId = null;
  this.metadataProfileVersion = null;
  this.metadataObjectType = null;
  this.objectId = null;
  this.version = null;
  this.createdAt = null;
  this.updatedAt = null;
  this.status = null;
  this.xml = null;
};
module.exports.BorhanMetadata = BorhanMetadata;

util.inherits(BorhanMetadata, borhan.BorhanObjectBase);


/**
 * @param  objects  array     (readOnly).
 * @param  totalCount  int     (readOnly).
 */
function BorhanMetadataListResponse(){
  BorhanMetadataListResponse.super_.call(this);
  this.objects = null;
  this.totalCount = null;
};
module.exports.BorhanMetadataListResponse = BorhanMetadataListResponse;

util.inherits(BorhanMetadataListResponse, borhan.BorhanObjectBase);


/**
 * @param id int  (readOnly).
 * @param type int  (readOnly).
 * @param name string .
 * @param friendlyName string .
 * @param description string .
 * @param status int .
 * @param partnerId int  (readOnly).
 * @param dependsOnPermissionNames string .
 * @param tags string .
 * @param permissionItemsIds string .
 * @param createdAt int  (readOnly).
 * @param updatedAt int  (readOnly).
 * @param partnerGroup string .
 */
function BorhanPermission(){
        BorhanPermission.super_.call(this);
        this.id = null;
        this.type = null;
        this.name = null;
        this.friendlyName = null;
        this.description = null;
        this.status = null;
        this.partnerId = null;
        this.dependsOnPermissionNames = null;
        this.tags = null;
        this.permissionItemsIds = null;
        this.createdAt = null;
        this.updatedAt = null;
        this.partnerGroup = null;
}
module.exports.BorhanPermission = BorhanPermission;

util.inherits(BorhanPermission, borhan.BorhanObjectBase);


/**
 * @param objects array  (readOnly).
 * @param totalCount int  (readOnly).
 */
function BorhanPermissionListResponse(){
        BorhanPermissionListResponse.super_.call(this);
        this.objects = null;
        this.totalCount = null;
}
module.exports.BorhanPermissionListResponse = BorhanPermissionListResponse;

util.inherits(BorhanPermissionListResponse, borhan.BorhanObjectBase);


/**
 * @param  url  string    Remote URL, FTP, HTTP or HTTPS 
 *  	 .
 * @param  forceAsyncDownload  bool    Force Import Job 
 *  	 .
 */
function BorhanUrlResource(){
  BorhanUrlResource.super_.call(this);
  this.url = null;
  this.forceAsyncDownload = null;
};
module.exports.BorhanUrlResource = BorhanUrlResource;

util.inherits(BorhanUrlResource, BorhanContentResource);


/**
 * @param  storageProfileId  int    ID of storage profile to be associated with the created file sync, used for file serving URL composing. 
 *  	 .
 */
function BorhanRemoteStorageResource(){
  BorhanRemoteStorageResource.super_.call(this);
  this.storageProfileId = null;
};
module.exports.BorhanRemoteStorageResource = BorhanRemoteStorageResource;

util.inherits(BorhanRemoteStorageResource, BorhanUrlResource);


/**
 * @param  id  int     (readOnly).
 * @param  name  string    Name of the uiConf, this is not a primary key
 *  	 .
 * @param  description  string    .
 * @param  partnerId  int     (readOnly).
 * @param  objType  int    .
 * @param  objTypeAsString  string     (readOnly).
 * @param  width  int    .
 * @param  height  int    .
 * @param  htmlParams  string    .
 * @param  swfUrl  string    .
 * @param  confFilePath  string     (readOnly).
 * @param  confFile  string    .
 * @param  confFileFeatures  string    .
 * @param  config  string    .
 * @param  confVars  string    .
 * @param  useCdn  bool    .
 * @param  tags  string    .
 * @param  swfUrlVersion  string    .
 * @param  createdAt  int    Entry creation date as Unix timestamp (In seconds)
 *  	  (readOnly).
 * @param  updatedAt  int    Entry creation date as Unix timestamp (In seconds)
 *  	  (readOnly).
 * @param  creationMode  int    .
 * @param  html5Url  string    .
 * @param  version  string    UiConf version
 *  	  (readOnly).
 * @param  partnerTags  string    .
 */
function BorhanUiConf(){
  BorhanUiConf.super_.call(this);
  this.id = null;
  this.name = null;
  this.description = null;
  this.partnerId = null;
  this.objType = null;
  this.objTypeAsString = null;
  this.width = null;
  this.height = null;
  this.htmlParams = null;
  this.swfUrl = null;
  this.confFilePath = null;
  this.confFile = null;
  this.confFileFeatures = null;
  this.config = null;
  this.confVars = null;
  this.useCdn = null;
  this.tags = null;
  this.swfUrlVersion = null;
  this.createdAt = null;
  this.updatedAt = null;
  this.creationMode = null;
  this.html5Url = null;
  this.version = null;
  this.partnerTags = null;
};
module.exports.BorhanUiConf = BorhanUiConf;

util.inherits(BorhanUiConf, borhan.BorhanObjectBase);

/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 */
function BorhanAccessControlBaseFilter(){
  BorhanAccessControlBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
};
module.exports.BorhanAccessControlBaseFilter = BorhanAccessControlBaseFilter;

util.inherits(BorhanAccessControlBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function BorhanAccessControlProfileBaseFilter(){
  BorhanAccessControlProfileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.BorhanAccessControlProfileBaseFilter = BorhanAccessControlProfileBaseFilter;

util.inherits(BorhanAccessControlProfileBaseFilter, BorhanFilter);


/**
 * @param  protocolType  string     (insertOnly).
 * @param  sourceUrl  string    .
 * @param  adType  string    .
 * @param  title  string    .
 * @param  endTime  int    .
 * @param  duration  int    Duration in milliseconds
 *  	 .
 */
function BorhanAdCuePoint(){
  BorhanAdCuePoint.super_.call(this);
  this.protocolType = null;
  this.sourceUrl = null;
  this.adType = null;
  this.title = null;
  this.endTime = null;
  this.duration = null;
};
module.exports.BorhanAdCuePoint = BorhanAdCuePoint;

util.inherits(BorhanAdCuePoint, BorhanCuePoint);


/**
 * @param  parentId  string     (insertOnly).
 * @param  text  string    .
 * @param  endTime  int    End time in milliseconds
 *  	 .
 * @param  duration  int    Duration in milliseconds
 *  	  (readOnly).
 * @param  depth  int    Depth in the tree
 *  	  (readOnly).
 * @param  childrenCount  int    Number of all descendants
 *  	  (readOnly).
 * @param  directChildrenCount  int    Number of children, first generation only.
 *  	  (readOnly).
 */
function BorhanAnnotation(){
  BorhanAnnotation.super_.call(this);
  this.parentId = null;
  this.text = null;
  this.endTime = null;
  this.duration = null;
  this.depth = null;
  this.childrenCount = null;
  this.directChildrenCount = null;
};
module.exports.BorhanAnnotation = BorhanAnnotation;

util.inherits(BorhanAnnotation, BorhanCuePoint);


/**
 * @param  idEqual  string    .
 * @param  idIn  string    .
 * @param  entryIdEqual  string    .
 * @param  entryIdIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  sizeGreaterThanOrEqual  int    .
 * @param  sizeLessThanOrEqual  int    .
 * @param  tagsLike  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  deletedAtGreaterThanOrEqual  int    .
 * @param  deletedAtLessThanOrEqual  int    .
 */
function BorhanAssetBaseFilter(){
  BorhanAssetBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.entryIdEqual = null;
  this.entryIdIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.sizeGreaterThanOrEqual = null;
  this.sizeLessThanOrEqual = null;
  this.tagsLike = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.deletedAtGreaterThanOrEqual = null;
  this.deletedAtLessThanOrEqual = null;
};
module.exports.BorhanAssetBaseFilter = BorhanAssetBaseFilter;

util.inherits(BorhanAssetBaseFilter, BorhanFilter);


/**
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  isSystemDefaultEqual  int    .
 * @param  tagsEqual  string    .
 */
function BorhanAssetParamsBaseFilter(){
  BorhanAssetParamsBaseFilter.super_.call(this);
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.isSystemDefaultEqual = null;
  this.tagsEqual = null;
};
module.exports.BorhanAssetParamsBaseFilter = BorhanAssetParamsBaseFilter;

util.inherits(BorhanAssetParamsBaseFilter, BorhanFilter);


/**
 * @param  resources  array    Array of resources associated with asset params ids
 *  	 .
 */
function BorhanAssetsParamsResourceContainers(){
  BorhanAssetsParamsResourceContainers.super_.call(this);
  this.resources = null;
};
module.exports.BorhanAssetsParamsResourceContainers = BorhanAssetsParamsResourceContainers;

util.inherits(BorhanAssetsParamsResourceContainers, BorhanResource);


/**
 * @param  idEqual  int    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  parsedAtGreaterThanOrEqual  int    .
 * @param  parsedAtLessThanOrEqual  int    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  auditObjectTypeEqual  string    .
 * @param  auditObjectTypeIn  string    .
 * @param  objectIdEqual  string    .
 * @param  objectIdIn  string    .
 * @param  relatedObjectIdEqual  string    .
 * @param  relatedObjectIdIn  string    .
 * @param  relatedObjectTypeEqual  string    .
 * @param  relatedObjectTypeIn  string    .
 * @param  entryIdEqual  string    .
 * @param  entryIdIn  string    .
 * @param  masterPartnerIdEqual  int    .
 * @param  masterPartnerIdIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  requestIdEqual  string    .
 * @param  requestIdIn  string    .
 * @param  userIdEqual  string    .
 * @param  userIdIn  string    .
 * @param  actionEqual  string    .
 * @param  actionIn  string    .
 * @param  ksEqual  string    .
 * @param  contextEqual  int    .
 * @param  contextIn  string    .
 * @param  entryPointEqual  string    .
 * @param  entryPointIn  string    .
 * @param  serverNameEqual  string    .
 * @param  serverNameIn  string    .
 * @param  ipAddressEqual  string    .
 * @param  ipAddressIn  string    .
 * @param  clientTagEqual  string    .
 */
function BorhanAuditTrailBaseFilter(){
  BorhanAuditTrailBaseFilter.super_.call(this);
  this.idEqual = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.parsedAtGreaterThanOrEqual = null;
  this.parsedAtLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.auditObjectTypeEqual = null;
  this.auditObjectTypeIn = null;
  this.objectIdEqual = null;
  this.objectIdIn = null;
  this.relatedObjectIdEqual = null;
  this.relatedObjectIdIn = null;
  this.relatedObjectTypeEqual = null;
  this.relatedObjectTypeIn = null;
  this.entryIdEqual = null;
  this.entryIdIn = null;
  this.masterPartnerIdEqual = null;
  this.masterPartnerIdIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.requestIdEqual = null;
  this.requestIdIn = null;
  this.userIdEqual = null;
  this.userIdIn = null;
  this.actionEqual = null;
  this.actionIn = null;
  this.ksEqual = null;
  this.contextEqual = null;
  this.contextIn = null;
  this.entryPointEqual = null;
  this.entryPointIn = null;
  this.serverNameEqual = null;
  this.serverNameIn = null;
  this.ipAddressEqual = null;
  this.ipAddressIn = null;
  this.clientTagEqual = null;
};
module.exports.BorhanAuditTrailBaseFilter = BorhanAuditTrailBaseFilter;

util.inherits(BorhanAuditTrailBaseFilter, BorhanFilter);


/**
 */
function BorhanBaseSyndicationFeedBaseFilter(){
  BorhanBaseSyndicationFeedBaseFilter.super_.call(this);
};
module.exports.BorhanBaseSyndicationFeedBaseFilter = BorhanBaseSyndicationFeedBaseFilter;

util.inherits(BorhanBaseSyndicationFeedBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idGreaterThanOrEqual  int    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  partnerIdNotIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  executionAttemptsGreaterThanOrEqual  int    .
 * @param  executionAttemptsLessThanOrEqual  int    .
 * @param  lockVersionGreaterThanOrEqual  int    .
 * @param  lockVersionLessThanOrEqual  int    .
 * @param  entryIdEqual  string    .
 * @param  jobTypeEqual  string    .
 * @param  jobTypeIn  string    .
 * @param  jobTypeNotIn  string    .
 * @param  jobSubTypeEqual  int    .
 * @param  jobSubTypeIn  string    .
 * @param  jobSubTypeNotIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  statusNotIn  string    .
 * @param  priorityGreaterThanOrEqual  int    .
 * @param  priorityLessThanOrEqual  int    .
 * @param  priorityEqual  int    .
 * @param  priorityIn  string    .
 * @param  priorityNotIn  string    .
 * @param  batchVersionGreaterThanOrEqual  int    .
 * @param  batchVersionLessThanOrEqual  int    .
 * @param  batchVersionEqual  int    .
 * @param  queueTimeGreaterThanOrEqual  int    .
 * @param  queueTimeLessThanOrEqual  int    .
 * @param  finishTimeGreaterThanOrEqual  int    .
 * @param  finishTimeLessThanOrEqual  int    .
 * @param  errTypeEqual  int    .
 * @param  errTypeIn  string    .
 * @param  errTypeNotIn  string    .
 * @param  errNumberEqual  int    .
 * @param  errNumberIn  string    .
 * @param  errNumberNotIn  string    .
 * @param  estimatedEffortLessThan  int    .
 * @param  estimatedEffortGreaterThan  int    .
 * @param  urgencyLessThanOrEqual  int    .
 * @param  urgencyGreaterThanOrEqual  int    .
 */
function BorhanBatchJobBaseFilter(){
  BorhanBatchJobBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idGreaterThanOrEqual = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.partnerIdNotIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.executionAttemptsGreaterThanOrEqual = null;
  this.executionAttemptsLessThanOrEqual = null;
  this.lockVersionGreaterThanOrEqual = null;
  this.lockVersionLessThanOrEqual = null;
  this.entryIdEqual = null;
  this.jobTypeEqual = null;
  this.jobTypeIn = null;
  this.jobTypeNotIn = null;
  this.jobSubTypeEqual = null;
  this.jobSubTypeIn = null;
  this.jobSubTypeNotIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.statusNotIn = null;
  this.priorityGreaterThanOrEqual = null;
  this.priorityLessThanOrEqual = null;
  this.priorityEqual = null;
  this.priorityIn = null;
  this.priorityNotIn = null;
  this.batchVersionGreaterThanOrEqual = null;
  this.batchVersionLessThanOrEqual = null;
  this.batchVersionEqual = null;
  this.queueTimeGreaterThanOrEqual = null;
  this.queueTimeLessThanOrEqual = null;
  this.finishTimeGreaterThanOrEqual = null;
  this.finishTimeLessThanOrEqual = null;
  this.errTypeEqual = null;
  this.errTypeIn = null;
  this.errTypeNotIn = null;
  this.errNumberEqual = null;
  this.errNumberIn = null;
  this.errNumberNotIn = null;
  this.estimatedEffortLessThan = null;
  this.estimatedEffortGreaterThan = null;
  this.urgencyLessThanOrEqual = null;
  this.urgencyGreaterThanOrEqual = null;
};
module.exports.BorhanBatchJobBaseFilter = BorhanBatchJobBaseFilter;

util.inherits(BorhanBatchJobBaseFilter, BorhanFilter);


/**
 * @param  uploadedOnGreaterThanOrEqual  int    .
 * @param  uploadedOnLessThanOrEqual  int    .
 * @param  uploadedOnEqual  int    .
 * @param  statusIn  string    .
 * @param  statusEqual  int    .
 * @param  bulkUploadObjectTypeEqual  string    .
 * @param  bulkUploadObjectTypeIn  string    .
 */
function BorhanBulkUploadBaseFilter(){
  BorhanBulkUploadBaseFilter.super_.call(this);
  this.uploadedOnGreaterThanOrEqual = null;
  this.uploadedOnLessThanOrEqual = null;
  this.uploadedOnEqual = null;
  this.statusIn = null;
  this.statusEqual = null;
  this.bulkUploadObjectTypeEqual = null;
  this.bulkUploadObjectTypeIn = null;
};
module.exports.BorhanBulkUploadBaseFilter = BorhanBulkUploadBaseFilter;

util.inherits(BorhanBulkUploadBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  parentIdEqual  int    .
 * @param  parentIdIn  string    .
 * @param  depthEqual  int    .
 * @param  fullNameEqual  string    .
 * @param  fullNameStartsWith  string    .
 * @param  fullNameIn  string    .
 * @param  fullIdsEqual  string    .
 * @param  fullIdsStartsWith  string    .
 * @param  fullIdsMatchOr  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  tagsLike  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  appearInListEqual  int    .
 * @param  privacyEqual  int    .
 * @param  privacyIn  string    .
 * @param  inheritanceTypeEqual  int    .
 * @param  inheritanceTypeIn  string    .
 * @param  referenceIdEqual  string    .
 * @param  referenceIdEmpty  int    .
 * @param  contributionPolicyEqual  int    .
 * @param  membersCountGreaterThanOrEqual  int    .
 * @param  membersCountLessThanOrEqual  int    .
 * @param  pendingMembersCountGreaterThanOrEqual  int    .
 * @param  pendingMembersCountLessThanOrEqual  int    .
 * @param  privacyContextEqual  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  inheritedParentIdEqual  int    .
 * @param  inheritedParentIdIn  string    .
 * @param  partnerSortValueGreaterThanOrEqual  int    .
 * @param  partnerSortValueLessThanOrEqual  int    .
 */
function BorhanCategoryBaseFilter(){
  BorhanCategoryBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.parentIdEqual = null;
  this.parentIdIn = null;
  this.depthEqual = null;
  this.fullNameEqual = null;
  this.fullNameStartsWith = null;
  this.fullNameIn = null;
  this.fullIdsEqual = null;
  this.fullIdsStartsWith = null;
  this.fullIdsMatchOr = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.tagsLike = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.appearInListEqual = null;
  this.privacyEqual = null;
  this.privacyIn = null;
  this.inheritanceTypeEqual = null;
  this.inheritanceTypeIn = null;
  this.referenceIdEqual = null;
  this.referenceIdEmpty = null;
  this.contributionPolicyEqual = null;
  this.membersCountGreaterThanOrEqual = null;
  this.membersCountLessThanOrEqual = null;
  this.pendingMembersCountGreaterThanOrEqual = null;
  this.pendingMembersCountLessThanOrEqual = null;
  this.privacyContextEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.inheritedParentIdEqual = null;
  this.inheritedParentIdIn = null;
  this.partnerSortValueGreaterThanOrEqual = null;
  this.partnerSortValueLessThanOrEqual = null;
};
module.exports.BorhanCategoryBaseFilter = BorhanCategoryBaseFilter;

util.inherits(BorhanCategoryBaseFilter, BorhanFilter);


/**
 * @param  categoriesMatchOr  string    .
 * @param  categoryEntryStatusIn  string    .
 * @param  orderBy  string    .
 * @param  categoryIdEqual  int    .
 */
function BorhanCategoryEntryAdvancedFilter(){
  BorhanCategoryEntryAdvancedFilter.super_.call(this);
  this.categoriesMatchOr = null;
  this.categoryEntryStatusIn = null;
  this.orderBy = null;
  this.categoryIdEqual = null;
};
module.exports.BorhanCategoryEntryAdvancedFilter = BorhanCategoryEntryAdvancedFilter;

util.inherits(BorhanCategoryEntryAdvancedFilter, BorhanSearchItem);


/**
 * @param  categoryIdEqual  int    .
 * @param  categoryIdIn  string    .
 * @param  entryIdEqual  string    .
 * @param  entryIdIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  categoryFullIdsStartsWith  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 */
function BorhanCategoryEntryBaseFilter(){
  BorhanCategoryEntryBaseFilter.super_.call(this);
  this.categoryIdEqual = null;
  this.categoryIdIn = null;
  this.entryIdEqual = null;
  this.entryIdIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.categoryFullIdsStartsWith = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.BorhanCategoryEntryBaseFilter = BorhanCategoryEntryBaseFilter;

util.inherits(BorhanCategoryEntryBaseFilter, BorhanFilter);


/**
 * @param  memberIdEq  string    .
 * @param  memberIdIn  string    .
 * @param  memberPermissionsMatchOr  string    .
 * @param  memberPermissionsMatchAnd  string    .
 */
function BorhanCategoryUserAdvancedFilter(){
  BorhanCategoryUserAdvancedFilter.super_.call(this);
  this.memberIdEq = null;
  this.memberIdIn = null;
  this.memberPermissionsMatchOr = null;
  this.memberPermissionsMatchAnd = null;
};
module.exports.BorhanCategoryUserAdvancedFilter = BorhanCategoryUserAdvancedFilter;

util.inherits(BorhanCategoryUserAdvancedFilter, BorhanSearchItem);


/**
 * @param  categoryIdEqual  int    .
 * @param  categoryIdIn  string    .
 * @param  userIdEqual  string    .
 * @param  userIdIn  string    .
 * @param  permissionLevelEqual  int    .
 * @param  permissionLevelIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  updateMethodEqual  int    .
 * @param  updateMethodIn  string    .
 * @param  categoryFullIdsStartsWith  string    .
 * @param  categoryFullIdsEqual  string    .
 * @param  permissionNamesMatchAnd  string    .
 * @param  permissionNamesMatchOr  string    .
 * @param  permissionNamesNotContains  string    .
 */
function BorhanCategoryUserBaseFilter(){
  BorhanCategoryUserBaseFilter.super_.call(this);
  this.categoryIdEqual = null;
  this.categoryIdIn = null;
  this.userIdEqual = null;
  this.userIdIn = null;
  this.permissionLevelEqual = null;
  this.permissionLevelIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.updateMethodEqual = null;
  this.updateMethodIn = null;
  this.categoryFullIdsStartsWith = null;
  this.categoryFullIdsEqual = null;
  this.permissionNamesMatchAnd = null;
  this.permissionNamesMatchOr = null;
  this.permissionNamesNotContains = null;
};
module.exports.BorhanCategoryUserBaseFilter = BorhanCategoryUserBaseFilter;

util.inherits(BorhanCategoryUserBaseFilter, BorhanFilter);


/**
 * @param  userIdEqual  string    .
 * @param  userIdIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  updateMethodEqual  int    .
 * @param  updateMethodIn  string    .
 * @param  permissionNamesMatchAnd  string    .
 * @param  permissionNamesMatchOr  string    .
 */
function BorhanCategoryUserProviderFilter(){
  BorhanCategoryUserProviderFilter.super_.call(this);
  this.userIdEqual = null;
  this.userIdIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.updateMethodEqual = null;
  this.updateMethodIn = null;
  this.permissionNamesMatchAnd = null;
  this.permissionNamesMatchOr = null;
};
module.exports.BorhanCategoryUserProviderFilter = BorhanCategoryUserProviderFilter;

util.inherits(BorhanCategoryUserProviderFilter, BorhanFilter);


/**
 * @param  offset  int    Offset in milliseconds
 *  	 .
 * @param  duration  int    Duration in milliseconds
 *  	 .
 */
function BorhanClipAttributes(){
  BorhanClipAttributes.super_.call(this);
  this.offset = null;
  this.duration = null;
};
module.exports.BorhanClipAttributes = BorhanClipAttributes;

util.inherits(BorhanClipAttributes, BorhanOperationAttributes);


/**
 * @param  code  string    .
 * @param  description  string    .
 * @param  endTime  int    .
 * @param  duration  int    Duration in milliseconds
 *  	  (readOnly).
 */
function BorhanCodeCuePoint(){
  BorhanCodeCuePoint.super_.call(this);
  this.code = null;
  this.description = null;
  this.endTime = null;
  this.duration = null;
};
module.exports.BorhanCodeCuePoint = BorhanCodeCuePoint;

util.inherits(BorhanCodeCuePoint, BorhanCuePoint);


/**
 */
function BorhanDataCenterContentResource(){
  BorhanDataCenterContentResource.super_.call(this);
};
module.exports.BorhanDataCenterContentResource = BorhanDataCenterContentResource;

util.inherits(BorhanDataCenterContentResource, BorhanContentResource);


/**
 * @param  resource  BorhanDataCenterContentResource    The resource to be concatenated
 *  	 .
 */
function BorhanConcatAttributes(){
  BorhanConcatAttributes.super_.call(this);
  this.resource = null;
};
module.exports.BorhanConcatAttributes = BorhanConcatAttributes;

util.inherits(BorhanConcatAttributes, BorhanOperationAttributes);


/**
 * @param  noDistributionProfiles  bool    .
 * @param  distributionProfileId  int    .
 * @param  distributionSunStatus  int    .
 * @param  entryDistributionFlag  int    .
 * @param  entryDistributionStatus  int    .
 * @param  hasEntryDistributionValidationErrors  bool    .
 * @param  entryDistributionValidationErrors  string    Comma seperated validation error types
 *  	 .
 */
function BorhanContentDistributionSearchItem(){
  BorhanContentDistributionSearchItem.super_.call(this);
  this.noDistributionProfiles = null;
  this.distributionProfileId = null;
  this.distributionSunStatus = null;
  this.entryDistributionFlag = null;
  this.entryDistributionStatus = null;
  this.hasEntryDistributionValidationErrors = null;
  this.entryDistributionValidationErrors = null;
};
module.exports.BorhanContentDistributionSearchItem = BorhanContentDistributionSearchItem;

util.inherits(BorhanContentDistributionSearchItem, BorhanSearchItem);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  createdByIdEqual  int    .
 * @param  typeEqual  int    .
 * @param  typeIn  string    .
 * @param  targetTypeEqual  int    .
 * @param  targetTypeIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 */
function BorhanControlPanelCommandBaseFilter(){
  BorhanControlPanelCommandBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.createdByIdEqual = null;
  this.typeEqual = null;
  this.typeIn = null;
  this.targetTypeEqual = null;
  this.targetTypeIn = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.BorhanControlPanelCommandBaseFilter = BorhanControlPanelCommandBaseFilter;

util.inherits(BorhanControlPanelCommandBaseFilter, BorhanFilter);


/**
 * @param  conversionProfileIdEqual  int    .
 * @param  conversionProfileIdIn  string    .
 * @param  assetParamsIdEqual  int    .
 * @param  assetParamsIdIn  string    .
 * @param  readyBehaviorEqual  int    .
 * @param  readyBehaviorIn  string    .
 * @param  originEqual  int    .
 * @param  originIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 */
function BorhanConversionProfileAssetParamsBaseFilter(){
  BorhanConversionProfileAssetParamsBaseFilter.super_.call(this);
  this.conversionProfileIdEqual = null;
  this.conversionProfileIdIn = null;
  this.assetParamsIdEqual = null;
  this.assetParamsIdIn = null;
  this.readyBehaviorEqual = null;
  this.readyBehaviorIn = null;
  this.originEqual = null;
  this.originIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
};
module.exports.BorhanConversionProfileAssetParamsBaseFilter = BorhanConversionProfileAssetParamsBaseFilter;

util.inherits(BorhanConversionProfileAssetParamsBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  statusEqual  string    .
 * @param  statusIn  string    .
 * @param  typeEqual  string    .
 * @param  typeIn  string    .
 * @param  nameEqual  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  defaultEntryIdEqual  string    .
 * @param  defaultEntryIdIn  string    .
 */
function BorhanConversionProfileBaseFilter(){
  BorhanConversionProfileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.typeEqual = null;
  this.typeIn = null;
  this.nameEqual = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.defaultEntryIdEqual = null;
  this.defaultEntryIdIn = null;
};
module.exports.BorhanConversionProfileBaseFilter = BorhanConversionProfileBaseFilter;

util.inherits(BorhanConversionProfileBaseFilter, BorhanFilter);


/**
 * @param  idEqual  string    .
 * @param  idIn  string    .
 * @param  cuePointTypeEqual  string    .
 * @param  cuePointTypeIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  entryIdEqual  string    .
 * @param  entryIdIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  triggeredAtGreaterThanOrEqual  int    .
 * @param  triggeredAtLessThanOrEqual  int    .
 * @param  tagsLike  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  startTimeGreaterThanOrEqual  int    .
 * @param  startTimeLessThanOrEqual  int    .
 * @param  userIdEqual  string    .
 * @param  userIdIn  string    .
 * @param  partnerSortValueEqual  int    .
 * @param  partnerSortValueIn  string    .
 * @param  partnerSortValueGreaterThanOrEqual  int    .
 * @param  partnerSortValueLessThanOrEqual  int    .
 * @param  forceStopEqual  int    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 */
function BorhanCuePointBaseFilter(){
  BorhanCuePointBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.cuePointTypeEqual = null;
  this.cuePointTypeIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.entryIdEqual = null;
  this.entryIdIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.triggeredAtGreaterThanOrEqual = null;
  this.triggeredAtLessThanOrEqual = null;
  this.tagsLike = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.startTimeGreaterThanOrEqual = null;
  this.startTimeLessThanOrEqual = null;
  this.userIdEqual = null;
  this.userIdIn = null;
  this.partnerSortValueEqual = null;
  this.partnerSortValueIn = null;
  this.partnerSortValueGreaterThanOrEqual = null;
  this.partnerSortValueLessThanOrEqual = null;
  this.forceStopEqual = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
};
module.exports.BorhanCuePointBaseFilter = BorhanCuePointBaseFilter;

util.inherits(BorhanCuePointBaseFilter, BorhanFilter);


/**
 * @param  dataContent  string    The data of the entry
 *  	 .
 * @param  retrieveDataContentByGet  bool    indicator whether to return the object for get action with the dataContent field.
 *  	  (insertOnly).
 */
function BorhanDataEntry(){
  BorhanDataEntry.super_.call(this);
  this.dataContent = null;
  this.retrieveDataContentByGet = null;
};
module.exports.BorhanDataEntry = BorhanDataEntry;

util.inherits(BorhanDataEntry, BorhanBaseEntry);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 */
function BorhanDistributionProfileBaseFilter(){
  BorhanDistributionProfileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.BorhanDistributionProfileBaseFilter = BorhanDistributionProfileBaseFilter;

util.inherits(BorhanDistributionProfileBaseFilter, BorhanFilter);


/**
 * @param  typeEqual  string    .
 * @param  typeIn  string    .
 */
function BorhanDistributionProviderBaseFilter(){
  BorhanDistributionProviderBaseFilter.super_.call(this);
  this.typeEqual = null;
  this.typeIn = null;
};
module.exports.BorhanDistributionProviderBaseFilter = BorhanDistributionProviderBaseFilter;

util.inherits(BorhanDistributionProviderBaseFilter, BorhanFilter);


/**
 * @param  documentType  int    The type of the document
 *  	  (insertOnly).
 * @param  assetParamsIds  string    Comma separated asset params ids that exists for this media entry
 *  	  (readOnly).
 */
function BorhanDocumentEntry(){
  BorhanDocumentEntry.super_.call(this);
  this.documentType = null;
  this.assetParamsIds = null;
};
module.exports.BorhanDocumentEntry = BorhanDocumentEntry;

util.inherits(BorhanDocumentEntry, BorhanBaseEntry);


/**
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  deviceIdLike  string    .
 * @param  providerEqual  string    .
 * @param  providerIn  string    .
 */
function BorhanDrmDeviceBaseFilter(){
  BorhanDrmDeviceBaseFilter.super_.call(this);
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.deviceIdLike = null;
  this.providerEqual = null;
  this.providerIn = null;
};
module.exports.BorhanDrmDeviceBaseFilter = BorhanDrmDeviceBaseFilter;

util.inherits(BorhanDrmDeviceBaseFilter, BorhanFilter);


/**
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  nameLike  string    .
 * @param  systemNameLike  string    .
 * @param  providerEqual  string    .
 * @param  providerIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  scenarioEqual  string    .
 * @param  scenarioIn  string    .
 */
function BorhanDrmPolicyBaseFilter(){
  BorhanDrmPolicyBaseFilter.super_.call(this);
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.nameLike = null;
  this.systemNameLike = null;
  this.providerEqual = null;
  this.providerIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.scenarioEqual = null;
  this.scenarioIn = null;
};
module.exports.BorhanDrmPolicyBaseFilter = BorhanDrmPolicyBaseFilter;

util.inherits(BorhanDrmPolicyBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  nameLike  string    .
 * @param  providerEqual  string    .
 * @param  providerIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 */
function BorhanDrmProfileBaseFilter(){
  BorhanDrmProfileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.nameLike = null;
  this.providerEqual = null;
  this.providerIn = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.BorhanDrmProfileBaseFilter = BorhanDrmProfileBaseFilter;

util.inherits(BorhanDrmProfileBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  nameLike  string    .
 * @param  typeEqual  string    .
 * @param  typeIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  conversionProfileIdEqual  int    .
 * @param  conversionProfileIdIn  string    .
 * @param  dcEqual  int    .
 * @param  dcIn  string    .
 * @param  pathEqual  string    .
 * @param  pathLike  string    .
 * @param  fileHandlerTypeEqual  string    .
 * @param  fileHandlerTypeIn  string    .
 * @param  fileNamePatternsLike  string    .
 * @param  fileNamePatternsMultiLikeOr  string    .
 * @param  fileNamePatternsMultiLikeAnd  string    .
 * @param  tagsLike  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  errorCodeEqual  string    .
 * @param  errorCodeIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function BorhanDropFolderBaseFilter(){
  BorhanDropFolderBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.nameLike = null;
  this.typeEqual = null;
  this.typeIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.conversionProfileIdEqual = null;
  this.conversionProfileIdIn = null;
  this.dcEqual = null;
  this.dcIn = null;
  this.pathEqual = null;
  this.pathLike = null;
  this.fileHandlerTypeEqual = null;
  this.fileHandlerTypeIn = null;
  this.fileNamePatternsLike = null;
  this.fileNamePatternsMultiLikeOr = null;
  this.fileNamePatternsMultiLikeAnd = null;
  this.tagsLike = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.errorCodeEqual = null;
  this.errorCodeIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.BorhanDropFolderBaseFilter = BorhanDropFolderBaseFilter;

util.inherits(BorhanDropFolderBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  dropFolderIdEqual  int    .
 * @param  dropFolderIdIn  string    .
 * @param  fileNameEqual  string    .
 * @param  fileNameIn  string    .
 * @param  fileNameLike  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  statusNotIn  string    .
 * @param  parsedSlugEqual  string    .
 * @param  parsedSlugIn  string    .
 * @param  parsedSlugLike  string    .
 * @param  parsedFlavorEqual  string    .
 * @param  parsedFlavorIn  string    .
 * @param  parsedFlavorLike  string    .
 * @param  leadDropFolderFileIdEqual  int    .
 * @param  deletedDropFolderFileIdEqual  int    .
 * @param  entryIdEqual  string    .
 * @param  errorCodeEqual  string    .
 * @param  errorCodeIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function BorhanDropFolderFileBaseFilter(){
  BorhanDropFolderFileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.dropFolderIdEqual = null;
  this.dropFolderIdIn = null;
  this.fileNameEqual = null;
  this.fileNameIn = null;
  this.fileNameLike = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.statusNotIn = null;
  this.parsedSlugEqual = null;
  this.parsedSlugIn = null;
  this.parsedSlugLike = null;
  this.parsedFlavorEqual = null;
  this.parsedFlavorIn = null;
  this.parsedFlavorLike = null;
  this.leadDropFolderFileIdEqual = null;
  this.deletedDropFolderFileIdEqual = null;
  this.entryIdEqual = null;
  this.errorCodeEqual = null;
  this.errorCodeIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.BorhanDropFolderFileBaseFilter = BorhanDropFolderFileBaseFilter;

util.inherits(BorhanDropFolderFileBaseFilter, BorhanFilter);


/**
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  statusEqual  string    .
 * @param  statusIn  string    .
 */
function BorhanEntryAttendeeBaseFilter(){
  BorhanEntryAttendeeBaseFilter.super_.call(this);
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.BorhanEntryAttendeeBaseFilter = BorhanEntryAttendeeBaseFilter;

util.inherits(BorhanEntryAttendeeBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  submittedAtGreaterThanOrEqual  int    .
 * @param  submittedAtLessThanOrEqual  int    .
 * @param  entryIdEqual  string    .
 * @param  entryIdIn  string    .
 * @param  distributionProfileIdEqual  int    .
 * @param  distributionProfileIdIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  dirtyStatusEqual  int    .
 * @param  dirtyStatusIn  string    .
 * @param  sunriseGreaterThanOrEqual  int    .
 * @param  sunriseLessThanOrEqual  int    .
 * @param  sunsetGreaterThanOrEqual  int    .
 * @param  sunsetLessThanOrEqual  int    .
 */
function BorhanEntryDistributionBaseFilter(){
  BorhanEntryDistributionBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.submittedAtGreaterThanOrEqual = null;
  this.submittedAtLessThanOrEqual = null;
  this.entryIdEqual = null;
  this.entryIdIn = null;
  this.distributionProfileIdEqual = null;
  this.distributionProfileIdIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.dirtyStatusEqual = null;
  this.dirtyStatusIn = null;
  this.sunriseGreaterThanOrEqual = null;
  this.sunriseLessThanOrEqual = null;
  this.sunsetGreaterThanOrEqual = null;
  this.sunsetLessThanOrEqual = null;
};
module.exports.BorhanEntryDistributionBaseFilter = BorhanEntryDistributionBaseFilter;

util.inherits(BorhanEntryDistributionBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  typeEqual  string    .
 * @param  typeIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function BorhanEventNotificationTemplateBaseFilter(){
  BorhanEventNotificationTemplateBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.typeEqual = null;
  this.typeIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.BorhanEventNotificationTemplateBaseFilter = BorhanEventNotificationTemplateBaseFilter;

util.inherits(BorhanEventNotificationTemplateBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  fileAssetObjectTypeEqual  string    .
 * @param  objectIdEqual  string    .
 * @param  objectIdIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  statusEqual  string    .
 * @param  statusIn  string    .
 */
function BorhanFileAssetBaseFilter(){
  BorhanFileAssetBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.partnerIdEqual = null;
  this.fileAssetObjectTypeEqual = null;
  this.objectIdEqual = null;
  this.objectIdIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.BorhanFileAssetBaseFilter = BorhanFileAssetBaseFilter;

util.inherits(BorhanFileAssetBaseFilter, BorhanFilter);


/**
 * @param  partnerIdEqual  int    .
 * @param  fileObjectTypeEqual  string    .
 * @param  fileObjectTypeIn  string    .
 * @param  objectIdEqual  string    .
 * @param  objectIdIn  string    .
 * @param  versionEqual  string    .
 * @param  versionIn  string    .
 * @param  objectSubTypeEqual  int    .
 * @param  objectSubTypeIn  string    .
 * @param  dcEqual  string    .
 * @param  dcIn  string    .
 * @param  originalEqual  int    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  readyAtGreaterThanOrEqual  int    .
 * @param  readyAtLessThanOrEqual  int    .
 * @param  syncTimeGreaterThanOrEqual  int    .
 * @param  syncTimeLessThanOrEqual  int    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  fileTypeEqual  int    .
 * @param  fileTypeIn  string    .
 * @param  linkedIdEqual  int    .
 * @param  linkCountGreaterThanOrEqual  int    .
 * @param  linkCountLessThanOrEqual  int    .
 * @param  fileSizeGreaterThanOrEqual  float    .
 * @param  fileSizeLessThanOrEqual  float    .
 */
function BorhanFileSyncBaseFilter(){
  BorhanFileSyncBaseFilter.super_.call(this);
  this.partnerIdEqual = null;
  this.fileObjectTypeEqual = null;
  this.fileObjectTypeIn = null;
  this.objectIdEqual = null;
  this.objectIdIn = null;
  this.versionEqual = null;
  this.versionIn = null;
  this.objectSubTypeEqual = null;
  this.objectSubTypeIn = null;
  this.dcEqual = null;
  this.dcIn = null;
  this.originalEqual = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.readyAtGreaterThanOrEqual = null;
  this.readyAtLessThanOrEqual = null;
  this.syncTimeGreaterThanOrEqual = null;
  this.syncTimeLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.fileTypeEqual = null;
  this.fileTypeIn = null;
  this.linkedIdEqual = null;
  this.linkCountGreaterThanOrEqual = null;
  this.linkCountLessThanOrEqual = null;
  this.fileSizeGreaterThanOrEqual = null;
  this.fileSizeLessThanOrEqual = null;
};
module.exports.BorhanFileSyncBaseFilter = BorhanFileSyncBaseFilter;

util.inherits(BorhanFileSyncBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  genericDistributionProviderIdEqual  int    .
 * @param  genericDistributionProviderIdIn  string    .
 * @param  actionEqual  int    .
 * @param  actionIn  string    .
 */
function BorhanGenericDistributionProviderActionBaseFilter(){
  BorhanGenericDistributionProviderActionBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.genericDistributionProviderIdEqual = null;
  this.genericDistributionProviderIdIn = null;
  this.actionEqual = null;
  this.actionIn = null;
};
module.exports.BorhanGenericDistributionProviderActionBaseFilter = BorhanGenericDistributionProviderActionBaseFilter;

util.inherits(BorhanGenericDistributionProviderActionBaseFilter, BorhanFilter);


/**
 * @param  indexIdGreaterThan  int    .
 */
function BorhanIndexAdvancedFilter(){
  BorhanIndexAdvancedFilter.super_.call(this);
  this.indexIdGreaterThan = null;
};
module.exports.BorhanIndexAdvancedFilter = BorhanIndexAdvancedFilter;

util.inherits(BorhanIndexAdvancedFilter, BorhanSearchItem);


/**
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  statusEqual  string    .
 * @param  statusIn  string    .
 * @param  channelIdEqual  string    .
 * @param  channelIdIn  string    .
 * @param  startTimeGreaterThanOrEqual  float    .
 * @param  startTimeLessThanOrEqual  float    .
 */
function BorhanLiveChannelSegmentBaseFilter(){
  BorhanLiveChannelSegmentBaseFilter.super_.call(this);
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.channelIdEqual = null;
  this.channelIdIn = null;
  this.startTimeGreaterThanOrEqual = null;
  this.startTimeLessThanOrEqual = null;
};
module.exports.BorhanLiveChannelSegmentBaseFilter = BorhanLiveChannelSegmentBaseFilter;

util.inherits(BorhanLiveChannelSegmentBaseFilter, BorhanFilter);


/**
 * @param  flavorAssetIdEqual  string    .
 */
function BorhanMediaInfoBaseFilter(){
  BorhanMediaInfoBaseFilter.super_.call(this);
  this.flavorAssetIdEqual = null;
};
module.exports.BorhanMediaInfoBaseFilter = BorhanMediaInfoBaseFilter;

util.inherits(BorhanMediaInfoBaseFilter, BorhanFilter);


/**
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function BorhanMediaServerBaseFilter(){
  BorhanMediaServerBaseFilter.super_.call(this);
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.BorhanMediaServerBaseFilter = BorhanMediaServerBaseFilter;

util.inherits(BorhanMediaServerBaseFilter, BorhanFilter);


/**
 * @param  partnerIdEqual  int    .
 * @param  metadataProfileIdEqual  int    .
 * @param  metadataProfileVersionEqual  int    .
 * @param  metadataProfileVersionGreaterThanOrEqual  int    .
 * @param  metadataProfileVersionLessThanOrEqual  int    .
 * @param  metadataObjectTypeEqual  string    .
 * @param  objectIdEqual  string    .
 * @param  objectIdIn  string    .
 * @param  versionEqual  int    .
 * @param  versionGreaterThanOrEqual  int    .
 * @param  versionLessThanOrEqual  int    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 */
function BorhanMetadataBaseFilter(){
  BorhanMetadataBaseFilter.super_.call(this);
  this.partnerIdEqual = null;
  this.metadataProfileIdEqual = null;
  this.metadataProfileVersionEqual = null;
  this.metadataProfileVersionGreaterThanOrEqual = null;
  this.metadataProfileVersionLessThanOrEqual = null;
  this.metadataObjectTypeEqual = null;
  this.objectIdEqual = null;
  this.objectIdIn = null;
  this.versionEqual = null;
  this.versionGreaterThanOrEqual = null;
  this.versionLessThanOrEqual = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.BorhanMetadataBaseFilter = BorhanMetadataBaseFilter;

util.inherits(BorhanMetadataBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  partnerIdEqual  int    .
 * @param  metadataObjectTypeEqual  string    .
 * @param  metadataObjectTypeIn  string    .
 * @param  versionEqual  int    .
 * @param  nameEqual  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  createModeEqual  int    .
 * @param  createModeNotEqual  int    .
 * @param  createModeIn  string    .
 * @param  createModeNotIn  string    .
 */
function BorhanMetadataProfileBaseFilter(){
  BorhanMetadataProfileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.partnerIdEqual = null;
  this.metadataObjectTypeEqual = null;
  this.metadataObjectTypeIn = null;
  this.versionEqual = null;
  this.nameEqual = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.createModeEqual = null;
  this.createModeNotEqual = null;
  this.createModeIn = null;
  this.createModeNotIn = null;
};
module.exports.BorhanMetadataProfileBaseFilter = BorhanMetadataProfileBaseFilter;

util.inherits(BorhanMetadataProfileBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  idNotIn  string    .
 * @param  nameLike  string    .
 * @param  nameMultiLikeOr  string    .
 * @param  nameMultiLikeAnd  string    .
 * @param  nameEqual  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  partnerPackageEqual  int    .
 * @param  partnerPackageGreaterThanOrEqual  int    .
 * @param  partnerPackageLessThanOrEqual  int    .
 * @param  partnerGroupTypeEqual  int    .
 * @param  partnerNameDescriptionWebsiteAdminNameAdminEmailLike  string    .
 */
function BorhanPartnerBaseFilter(){
  BorhanPartnerBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.idNotIn = null;
  this.nameLike = null;
  this.nameMultiLikeOr = null;
  this.nameMultiLikeAnd = null;
  this.nameEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.partnerPackageEqual = null;
  this.partnerPackageGreaterThanOrEqual = null;
  this.partnerPackageLessThanOrEqual = null;
  this.partnerGroupTypeEqual = null;
  this.partnerNameDescriptionWebsiteAdminNameAdminEmailLike = null;
};
module.exports.BorhanPartnerBaseFilter = BorhanPartnerBaseFilter;

util.inherits(BorhanPartnerBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  typeEqual  int    .
 * @param  typeIn  string    .
 * @param  nameEqual  string    .
 * @param  nameIn  string    .
 * @param  friendlyNameLike  string    .
 * @param  descriptionLike  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  dependsOnPermissionNamesMultiLikeOr  string    .
 * @param  dependsOnPermissionNamesMultiLikeAnd  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function BorhanPermissionBaseFilter(){
  BorhanPermissionBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.typeEqual = null;
  this.typeIn = null;
  this.nameEqual = null;
  this.nameIn = null;
  this.friendlyNameLike = null;
  this.descriptionLike = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.dependsOnPermissionNamesMultiLikeOr = null;
  this.dependsOnPermissionNamesMultiLikeAnd = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.BorhanPermissionBaseFilter = BorhanPermissionBaseFilter;

util.inherits(BorhanPermissionBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  typeEqual  string    .
 * @param  typeIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function BorhanPermissionItemBaseFilter(){
  BorhanPermissionItemBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.typeEqual = null;
  this.typeIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.BorhanPermissionItemBaseFilter = BorhanPermissionItemBaseFilter;

util.inherits(BorhanPermissionItemBaseFilter, BorhanFilter);


/**
 * @param  plays  int    Number of plays
 *  	  (readOnly).
 * @param  views  int    Number of views
 *  	  (readOnly).
 * @param  lastPlayedAt  int    The last time the entry was played
 *  	  (readOnly).
 * @param  width  int    The width in pixels
 *  	  (readOnly).
 * @param  height  int    The height in pixels
 *  	  (readOnly).
 * @param  duration  int    The duration in seconds
 *  	  (readOnly).
 * @param  msDuration  int    The duration in miliseconds
 *  	 .
 * @param  durationType  string    The duration type (short for 0-4 mins, medium for 4-20 mins, long for 20+ mins)
 *  	  (readOnly).
 */
function BorhanPlayableEntry(){
  BorhanPlayableEntry.super_.call(this);
  this.plays = null;
  this.views = null;
  this.lastPlayedAt = null;
  this.width = null;
  this.height = null;
  this.duration = null;
  this.msDuration = null;
  this.durationType = null;
};
module.exports.BorhanPlayableEntry = BorhanPlayableEntry;

util.inherits(BorhanPlayableEntry, BorhanBaseEntry);


/**
 * @param  playlistContent  string    Content of the playlist - 
 *  	 XML if the playlistType is dynamic 
 *  	 text if the playlistType is static 
 *  	 url if the playlistType is mRss 
 *  	 .
 * @param  filters  array    .
 * @param  totalResults  int    Maximum count of results to be returned in playlist execution
 *  	 .
 * @param  playlistType  int    Type of playlist
 *  	 .
 * @param  plays  int    Number of plays
 *  	  (readOnly).
 * @param  views  int    Number of views
 *  	  (readOnly).
 * @param  duration  int    The duration in seconds
 *  	  (readOnly).
 * @param  executeUrl  string    The url for this playlist
 *  	  (readOnly).
 */
function BorhanPlaylist(){
  BorhanPlaylist.super_.call(this);
  this.playlistContent = null;
  this.filters = null;
  this.totalResults = null;
  this.playlistType = null;
  this.plays = null;
  this.views = null;
  this.duration = null;
  this.executeUrl = null;
};
module.exports.BorhanPlaylist = BorhanPlaylist;

util.inherits(BorhanPlaylist, BorhanBaseEntry);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 */
function BorhanReportBaseFilter(){
  BorhanReportBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
};
module.exports.BorhanReportBaseFilter = BorhanReportBaseFilter;

util.inherits(BorhanReportBaseFilter, BorhanFilter);


/**
 * @param  field  string    .
 * @param  value  string    .
 */
function BorhanSearchCondition(){
  BorhanSearchCondition.super_.call(this);
  this.field = null;
  this.value = null;
};
module.exports.BorhanSearchCondition = BorhanSearchCondition;

util.inherits(BorhanSearchCondition, BorhanSearchItem);


/**
 * @param  type  int    .
 * @param  items  array    .
 */
function BorhanSearchOperator(){
  BorhanSearchOperator.super_.call(this);
  this.type = null;
  this.items = null;
};
module.exports.BorhanSearchOperator = BorhanSearchOperator;

util.inherits(BorhanSearchOperator, BorhanSearchItem);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  expiresAtGreaterThanOrEqual  int    .
 * @param  expiresAtLessThanOrEqual  int    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  userIdEqual  string    .
 * @param  userIdIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 */
function BorhanShortLinkBaseFilter(){
  BorhanShortLinkBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.expiresAtGreaterThanOrEqual = null;
  this.expiresAtLessThanOrEqual = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.userIdEqual = null;
  this.userIdIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.BorhanShortLinkBaseFilter = BorhanShortLinkBaseFilter;

util.inherits(BorhanShortLinkBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  protocolEqual  string    .
 * @param  protocolIn  string    .
 */
function BorhanStorageProfileBaseFilter(){
  BorhanStorageProfileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.protocolEqual = null;
  this.protocolIn = null;
};
module.exports.BorhanStorageProfileBaseFilter = BorhanStorageProfileBaseFilter;

util.inherits(BorhanStorageProfileBaseFilter, BorhanFilter);


/**
 * @param  fromDate  int    Date range from
 *  	 .
 * @param  toDate  int    Date range to
 *  	 .
 * @param  timezoneOffset  int    Time zone offset
 *  	 .
 */
function BorhanSystemPartnerUsageFilter(){
  BorhanSystemPartnerUsageFilter.super_.call(this);
  this.fromDate = null;
  this.toDate = null;
  this.timezoneOffset = null;
};
module.exports.BorhanSystemPartnerUsageFilter = BorhanSystemPartnerUsageFilter;

util.inherits(BorhanSystemPartnerUsageFilter, BorhanFilter);


/**
 * @param  objectTypeEqual  string    .
 * @param  tagEqual  string    .
 * @param  tagStartsWith  string    .
 * @param  instanceCountEqual  int    .
 * @param  instanceCountIn  int    .
 */
function BorhanTagFilter(){
  BorhanTagFilter.super_.call(this);
  this.objectTypeEqual = null;
  this.tagEqual = null;
  this.tagStartsWith = null;
  this.instanceCountEqual = null;
  this.instanceCountIn = null;
};
module.exports.BorhanTagFilter = BorhanTagFilter;

util.inherits(BorhanTagFilter, BorhanFilter);

/**
* @param  isPublic  bool    .
*/
function BorhanUiConfAdmin(){
 BorhanUiConfAdmin.super_.call(this);
 this.isPublic = null;
};
module.exports.BorhanUiConfAdmin = BorhanUiConfAdmin;

util.inherits(BorhanUiConfAdmin, BorhanUiConf);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  nameLike  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  objTypeEqual  int    .
 * @param  objTypeIn  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  creationModeEqual  int    .
 * @param  creationModeIn  string    .
 * @param  versionEqual  string    .
 * @param  versionMultiLikeOr  string    .
 * @param  versionMultiLikeAnd  string    .
 * @param  partnerTagsMultiLikeOr  string    .
 * @param  partnerTagsMultiLikeAnd  string    .
 */
function BorhanUiConfBaseFilter(){
  BorhanUiConfBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.nameLike = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.objTypeEqual = null;
  this.objTypeIn = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.creationModeEqual = null;
  this.creationModeIn = null;
  this.versionEqual = null;
  this.versionMultiLikeOr = null;
  this.versionMultiLikeAnd = null;
  this.partnerTagsMultiLikeOr = null;
  this.partnerTagsMultiLikeAnd = null;
};
module.exports.BorhanUiConfBaseFilter = BorhanUiConfBaseFilter;

util.inherits(BorhanUiConfBaseFilter, BorhanFilter);


/**
 * @param  idEqual  string    .
 * @param  idIn  string    .
 * @param  userIdEqual  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  fileNameEqual  string    .
 * @param  fileSizeEqual  float    .
 */
function BorhanUploadTokenBaseFilter(){
  BorhanUploadTokenBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.userIdEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.fileNameEqual = null;
  this.fileSizeEqual = null;
};
module.exports.BorhanUploadTokenBaseFilter = BorhanUploadTokenBaseFilter;

util.inherits(BorhanUploadTokenBaseFilter, BorhanFilter);


/**
 * @param  partnerIdEqual  int    .
 * @param  screenNameLike  string    .
 * @param  screenNameStartsWith  string    .
 * @param  emailLike  string    .
 * @param  emailStartsWith  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  firstNameStartsWith  string    .
 * @param  lastNameStartsWith  string    .
 * @param  isAdminEqual  int    .
 */
function BorhanUserBaseFilter(){
  BorhanUserBaseFilter.super_.call(this);
  this.partnerIdEqual = null;
  this.screenNameLike = null;
  this.screenNameStartsWith = null;
  this.emailLike = null;
  this.emailStartsWith = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.firstNameStartsWith = null;
  this.lastNameStartsWith = null;
  this.isAdminEqual = null;
};
module.exports.BorhanUserBaseFilter = BorhanUserBaseFilter;

util.inherits(BorhanUserBaseFilter, BorhanFilter);


/**
 * @param  loginEmailEqual  string    .
 */
function BorhanUserLoginDataBaseFilter(){
  BorhanUserLoginDataBaseFilter.super_.call(this);
  this.loginEmailEqual = null;
};
module.exports.BorhanUserLoginDataBaseFilter = BorhanUserLoginDataBaseFilter;

util.inherits(BorhanUserLoginDataBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  nameEqual  string    .
 * @param  nameIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  descriptionLike  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function BorhanUserRoleBaseFilter(){
  BorhanUserRoleBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.nameEqual = null;
  this.nameIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.descriptionLike = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.BorhanUserRoleBaseFilter = BorhanUserRoleBaseFilter;

util.inherits(BorhanUserRoleBaseFilter, BorhanFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  nameEqual  string    .
 * @param  nameLike  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  engineTypeEqual  string    .
 * @param  engineTypeIn  string    .
 */
function BorhanVirusScanProfileBaseFilter(){
  BorhanVirusScanProfileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.nameEqual = null;
  this.nameLike = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.engineTypeEqual = null;
  this.engineTypeIn = null;
};
module.exports.BorhanVirusScanProfileBaseFilter = BorhanVirusScanProfileBaseFilter;

util.inherits(BorhanVirusScanProfileBaseFilter, BorhanFilter);


/**
 * @param  idEqual  string    .
 * @param  idIn  string    .
 * @param  sourceWidgetIdEqual  string    .
 * @param  rootWidgetIdEqual  string    .
 * @param  partnerIdEqual  int    .
 * @param  entryIdEqual  string    .
 * @param  uiConfIdEqual  int    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  partnerDataLike  string    .
 */
function BorhanWidgetBaseFilter(){
  BorhanWidgetBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.sourceWidgetIdEqual = null;
  this.rootWidgetIdEqual = null;
  this.partnerIdEqual = null;
  this.entryIdEqual = null;
  this.uiConfIdEqual = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.partnerDataLike = null;
};
module.exports.BorhanWidgetBaseFilter = BorhanWidgetBaseFilter;

util.inherits(BorhanWidgetBaseFilter, BorhanFilter);


/**
 */
function BorhanAccessControlFilter(){
  BorhanAccessControlFilter.super_.call(this);
};
module.exports.BorhanAccessControlFilter = BorhanAccessControlFilter;

util.inherits(BorhanAccessControlFilter, BorhanAccessControlBaseFilter);


/**
 */
function BorhanAccessControlProfileFilter(){
  BorhanAccessControlProfileFilter.super_.call(this);
};
module.exports.BorhanAccessControlProfileFilter = BorhanAccessControlProfileFilter;

util.inherits(BorhanAccessControlProfileFilter, BorhanAccessControlProfileBaseFilter);


/**
 */
function BorhanAssetFilter(){
  BorhanAssetFilter.super_.call(this);
};
module.exports.BorhanAssetFilter = BorhanAssetFilter;

util.inherits(BorhanAssetFilter, BorhanAssetBaseFilter);


/**
 */
function BorhanAssetParamsFilter(){
  BorhanAssetParamsFilter.super_.call(this);
};
module.exports.BorhanAssetParamsFilter = BorhanAssetParamsFilter;

util.inherits(BorhanAssetParamsFilter, BorhanAssetParamsBaseFilter);


/**
 * @param  assetId  string    ID of the source asset 
 *  	 .
 */
function BorhanAssetResource(){
  BorhanAssetResource.super_.call(this);
  this.assetId = null;
};
module.exports.BorhanAssetResource = BorhanAssetResource;

util.inherits(BorhanAssetResource, BorhanContentResource);


/**
 */
function BorhanAuditTrailFilter(){
  BorhanAuditTrailFilter.super_.call(this);
};
module.exports.BorhanAuditTrailFilter = BorhanAuditTrailFilter;

util.inherits(BorhanAuditTrailFilter, BorhanAuditTrailBaseFilter);


/**
 */
function BorhanBaseSyndicationFeedFilter(){
  BorhanBaseSyndicationFeedFilter.super_.call(this);
};
module.exports.BorhanBaseSyndicationFeedFilter = BorhanBaseSyndicationFeedFilter;

util.inherits(BorhanBaseSyndicationFeedFilter, BorhanBaseSyndicationFeedBaseFilter);


/**
 */
function BorhanBatchJobFilter(){
  BorhanBatchJobFilter.super_.call(this);
};
module.exports.BorhanBatchJobFilter = BorhanBatchJobFilter;

util.inherits(BorhanBatchJobFilter, BorhanBatchJobBaseFilter);


/**
 */
function BorhanBulkUploadFilter(){
  BorhanBulkUploadFilter.super_.call(this);
};
module.exports.BorhanBulkUploadFilter = BorhanBulkUploadFilter;

util.inherits(BorhanBulkUploadFilter, BorhanBulkUploadBaseFilter);


/**
 */
function BorhanCategoryEntryFilter(){
  BorhanCategoryEntryFilter.super_.call(this);
};
module.exports.BorhanCategoryEntryFilter = BorhanCategoryEntryFilter;

util.inherits(BorhanCategoryEntryFilter, BorhanCategoryEntryBaseFilter);


/**
 * @param  freeText  string    .
 * @param  membersIn  string    .
 * @param  nameOrReferenceIdStartsWith  string    .
 * @param  managerEqual  string    .
 * @param  memberEqual  string    .
 * @param  fullNameStartsWithIn  string    .
 * @param  ancestorIdIn  string    not includes the category itself (only sub categories)
 *  	 .
 * @param  idOrInheritedParentIdIn  string    .
 */
function BorhanCategoryFilter(){
  BorhanCategoryFilter.super_.call(this);
  this.freeText = null;
  this.membersIn = null;
  this.nameOrReferenceIdStartsWith = null;
  this.managerEqual = null;
  this.memberEqual = null;
  this.fullNameStartsWithIn = null;
  this.ancestorIdIn = null;
  this.idOrInheritedParentIdIn = null;
};
module.exports.BorhanCategoryFilter = BorhanCategoryFilter;

util.inherits(BorhanCategoryFilter, BorhanCategoryBaseFilter);


/**
 * @param  categoryDirectMembers  bool    Return the list of categoryUser that are not inherited from parent category - only the direct categoryUsers.
 *  	 .
 * @param  freeText  string    Free text search on user id or screen name
 *  	 .
 */
function BorhanCategoryUserFilter(){
  BorhanCategoryUserFilter.super_.call(this);
  this.categoryDirectMembers = null;
  this.freeText = null;
};
module.exports.BorhanCategoryUserFilter = BorhanCategoryUserFilter;

util.inherits(BorhanCategoryUserFilter, BorhanCategoryUserBaseFilter);


/**
 */
function BorhanControlPanelCommandFilter(){
  BorhanControlPanelCommandFilter.super_.call(this);
};
module.exports.BorhanControlPanelCommandFilter = BorhanControlPanelCommandFilter;

util.inherits(BorhanControlPanelCommandFilter, BorhanControlPanelCommandBaseFilter);


/**
 */
function BorhanConversionProfileFilter(){
  BorhanConversionProfileFilter.super_.call(this);
};
module.exports.BorhanConversionProfileFilter = BorhanConversionProfileFilter;

util.inherits(BorhanConversionProfileFilter, BorhanConversionProfileBaseFilter);


/**
 * @param  conversionProfileIdFilter  BorhanConversionProfileFilter    .
 * @param  assetParamsIdFilter  BorhanAssetParamsFilter    .
 */
function BorhanConversionProfileAssetParamsFilter(){
  BorhanConversionProfileAssetParamsFilter.super_.call(this);
  this.conversionProfileIdFilter = null;
  this.assetParamsIdFilter = null;
};
module.exports.BorhanConversionProfileAssetParamsFilter = BorhanConversionProfileAssetParamsFilter;

util.inherits(BorhanConversionProfileAssetParamsFilter, BorhanConversionProfileAssetParamsBaseFilter);


/**
 */
function BorhanCuePointFilter(){
  BorhanCuePointFilter.super_.call(this);
};
module.exports.BorhanCuePointFilter = BorhanCuePointFilter;

util.inherits(BorhanCuePointFilter, BorhanCuePointBaseFilter);


/**
 */
function BorhanDistributionProfileFilter(){
  BorhanDistributionProfileFilter.super_.call(this);
};
module.exports.BorhanDistributionProfileFilter = BorhanDistributionProfileFilter;

util.inherits(BorhanDistributionProfileFilter, BorhanDistributionProfileBaseFilter);


/**
 */
function BorhanDistributionProviderFilter(){
  BorhanDistributionProviderFilter.super_.call(this);
};
module.exports.BorhanDistributionProviderFilter = BorhanDistributionProviderFilter;

util.inherits(BorhanDistributionProviderFilter, BorhanDistributionProviderBaseFilter);


/**
 */
function BorhanDrmDeviceFilter(){
  BorhanDrmDeviceFilter.super_.call(this);
};
module.exports.BorhanDrmDeviceFilter = BorhanDrmDeviceFilter;

util.inherits(BorhanDrmDeviceFilter, BorhanDrmDeviceBaseFilter);


/**
 */
function BorhanDrmPolicyFilter(){
  BorhanDrmPolicyFilter.super_.call(this);
};
module.exports.BorhanDrmPolicyFilter = BorhanDrmPolicyFilter;

util.inherits(BorhanDrmPolicyFilter, BorhanDrmPolicyBaseFilter);


/**
 */
function BorhanDrmProfileFilter(){
  BorhanDrmProfileFilter.super_.call(this);
};
module.exports.BorhanDrmProfileFilter = BorhanDrmProfileFilter;

util.inherits(BorhanDrmProfileFilter, BorhanDrmProfileBaseFilter);


/**
 */
function BorhanDropFolderFileFilter(){
  BorhanDropFolderFileFilter.super_.call(this);
};
module.exports.BorhanDropFolderFileFilter = BorhanDropFolderFileFilter;

util.inherits(BorhanDropFolderFileFilter, BorhanDropFolderFileBaseFilter);


/**
 * @param  currentDc  int    .
 */
function BorhanDropFolderFilter(){
  BorhanDropFolderFilter.super_.call(this);
  this.currentDc = null;
};
module.exports.BorhanDropFolderFilter = BorhanDropFolderFilter;

util.inherits(BorhanDropFolderFilter, BorhanDropFolderBaseFilter);


/**
 */
function BorhanEntryAttendeeFilter(){
  BorhanEntryAttendeeFilter.super_.call(this);
};
module.exports.BorhanEntryAttendeeFilter = BorhanEntryAttendeeFilter;

util.inherits(BorhanEntryAttendeeFilter, BorhanEntryAttendeeBaseFilter);


/**
 */
function BorhanEntryDistributionFilter(){
  BorhanEntryDistributionFilter.super_.call(this);
};
module.exports.BorhanEntryDistributionFilter = BorhanEntryDistributionFilter;

util.inherits(BorhanEntryDistributionFilter, BorhanEntryDistributionBaseFilter);


/**
 * @param  entryId  string    ID of the source entry 
 *  	 .
 * @param  flavorParamsId  int    ID of the source flavor params, set to null to use the source flavor
 *  	 .
 */
function BorhanEntryResource(){
  BorhanEntryResource.super_.call(this);
  this.entryId = null;
  this.flavorParamsId = null;
};
module.exports.BorhanEntryResource = BorhanEntryResource;

util.inherits(BorhanEntryResource, BorhanContentResource);


/**
 */
function BorhanEventNotificationTemplateFilter(){
  BorhanEventNotificationTemplateFilter.super_.call(this);
};
module.exports.BorhanEventNotificationTemplateFilter = BorhanEventNotificationTemplateFilter;

util.inherits(BorhanEventNotificationTemplateFilter, BorhanEventNotificationTemplateBaseFilter);


/**
 */
function BorhanFileAssetFilter(){
  BorhanFileAssetFilter.super_.call(this);
};
module.exports.BorhanFileAssetFilter = BorhanFileAssetFilter;

util.inherits(BorhanFileAssetFilter, BorhanFileAssetBaseFilter);


/**
 * @param  currentDc  int    .
 */
function BorhanFileSyncFilter(){
  BorhanFileSyncFilter.super_.call(this);
  this.currentDc = null;
};
module.exports.BorhanFileSyncFilter = BorhanFileSyncFilter;

util.inherits(BorhanFileSyncFilter, BorhanFileSyncBaseFilter);


/**
 * @param  fileSyncObjectType  int    The object type of the file sync object 
 *  	 .
 * @param  objectSubType  int    The object sub-type of the file sync object 
 *  	 .
 * @param  objectId  string    The object id of the file sync object 
 *  	 .
 * @param  version  string    The version of the file sync object 
 *  	 .
 */
function BorhanFileSyncResource(){
  BorhanFileSyncResource.super_.call(this);
  this.fileSyncObjectType = null;
  this.objectSubType = null;
  this.objectId = null;
  this.version = null;
};
module.exports.BorhanFileSyncResource = BorhanFileSyncResource;

util.inherits(BorhanFileSyncResource, BorhanContentResource);


/**
 */
function BorhanGenericDistributionProviderActionFilter(){
  BorhanGenericDistributionProviderActionFilter.super_.call(this);
};
module.exports.BorhanGenericDistributionProviderActionFilter = BorhanGenericDistributionProviderActionFilter;

util.inherits(BorhanGenericDistributionProviderActionFilter, BorhanGenericDistributionProviderActionBaseFilter);


/**
 */
function BorhanLiveChannelSegmentFilter(){
  BorhanLiveChannelSegmentFilter.super_.call(this);
};
module.exports.BorhanLiveChannelSegmentFilter = BorhanLiveChannelSegmentFilter;

util.inherits(BorhanLiveChannelSegmentFilter, BorhanLiveChannelSegmentBaseFilter);


/**
 * @param  mediaType  int    The media type of the entry
 *  	  (insertOnly).
 * @param  conversionQuality  string    Override the default conversion quality  
 *  	  (insertOnly).
 * @param  sourceType  string    The source type of the entry 
 *  	  (insertOnly).
 * @param  searchProviderType  int    The search provider type used to import this entry
 *  	  (insertOnly).
 * @param  searchProviderId  string    The ID of the media in the importing site
 *  	  (insertOnly).
 * @param  creditUserName  string    The user name used for credits
 *  	 .
 * @param  creditUrl  string    The URL for credits
 *  	 .
 * @param  mediaDate  int    The media date extracted from EXIF data (For images) as Unix timestamp (In seconds)
 *  	  (readOnly).
 * @param  dataUrl  string    The URL used for playback. This is not the download URL.
 *  	  (readOnly).
 * @param  flavorParamsIds  string    Comma separated flavor params ids that exists for this media entry
 *  	  (readOnly).
 */
function BorhanMediaEntry(){
  BorhanMediaEntry.super_.call(this);
  this.mediaType = null;
  this.conversionQuality = null;
  this.sourceType = null;
  this.searchProviderType = null;
  this.searchProviderId = null;
  this.creditUserName = null;
  this.creditUrl = null;
  this.mediaDate = null;
  this.dataUrl = null;
  this.flavorParamsIds = null;
};
module.exports.BorhanMediaEntry = BorhanMediaEntry;

util.inherits(BorhanMediaEntry, BorhanPlayableEntry);


/**
 */
function BorhanMediaInfoFilter(){
  BorhanMediaInfoFilter.super_.call(this);
};
module.exports.BorhanMediaInfoFilter = BorhanMediaInfoFilter;

util.inherits(BorhanMediaInfoFilter, BorhanMediaInfoBaseFilter);


/**
 */
function BorhanMediaServerFilter(){
  BorhanMediaServerFilter.super_.call(this);
};
module.exports.BorhanMediaServerFilter = BorhanMediaServerFilter;

util.inherits(BorhanMediaServerFilter, BorhanMediaServerBaseFilter);


/**
 */
function BorhanMetadataFilter(){
  BorhanMetadataFilter.super_.call(this);
};
module.exports.BorhanMetadataFilter = BorhanMetadataFilter;

util.inherits(BorhanMetadataFilter, BorhanMetadataBaseFilter);


/**
 */
function BorhanMetadataProfileFilter(){
  BorhanMetadataProfileFilter.super_.call(this);
};
module.exports.BorhanMetadataProfileFilter = BorhanMetadataProfileFilter;

util.inherits(BorhanMetadataProfileFilter, BorhanMetadataProfileBaseFilter);


/**
 * @param  metadataProfileId  int    .
 * @param  orderBy  string    .
 */
function BorhanMetadataSearchItem(){
  BorhanMetadataSearchItem.super_.call(this);
  this.metadataProfileId = null;
  this.orderBy = null;
};
module.exports.BorhanMetadataSearchItem = BorhanMetadataSearchItem;

util.inherits(BorhanMetadataSearchItem, BorhanSearchOperator);


/**
 * @param  hasRealThumbnail  bool    Indicates whether the user has submited a real thumbnail to the mix (Not the one that was generated automaticaly)
 *  	  (readOnly).
 * @param  editorType  int    The editor type used to edit the metadata
 *  	 .
 * @param  dataContent  string    The xml data of the mix
 *  	 .
 */
function BorhanMixEntry(){
  BorhanMixEntry.super_.call(this);
  this.hasRealThumbnail = null;
  this.editorType = null;
  this.dataContent = null;
};
module.exports.BorhanMixEntry = BorhanMixEntry;

util.inherits(BorhanMixEntry, BorhanPlayableEntry);


/**
 * @param  resource  BorhanContentResource    Only BorhanEntryResource and BorhanAssetResource are supported
 *  	 .
 * @param  operationAttributes  array    .
 * @param  assetParamsId  int    ID of alternative asset params to be used instead of the system default flavor params 
 *  	 .
 */
function BorhanOperationResource(){
  BorhanOperationResource.super_.call(this);
  this.resource = null;
  this.operationAttributes = null;
  this.assetParamsId = null;
};
module.exports.BorhanOperationResource = BorhanOperationResource;

util.inherits(BorhanOperationResource, BorhanContentResource);


/**
 */
function BorhanPartnerFilter(){
  BorhanPartnerFilter.super_.call(this);
};
module.exports.BorhanPartnerFilter = BorhanPartnerFilter;

util.inherits(BorhanPartnerFilter, BorhanPartnerBaseFilter);


/**
 */
function BorhanPermissionFilter(){
  BorhanPermissionFilter.super_.call(this);
};
module.exports.BorhanPermissionFilter = BorhanPermissionFilter;

util.inherits(BorhanPermissionFilter, BorhanPermissionBaseFilter);


/**
 */
function BorhanPermissionItemFilter(){
  BorhanPermissionItemFilter.super_.call(this);
};
module.exports.BorhanPermissionItemFilter = BorhanPermissionItemFilter;

util.inherits(BorhanPermissionItemFilter, BorhanPermissionItemBaseFilter);


/**
 * @param  resources  array    Array of remote stoage resources 
 *  	 .
 */
function BorhanRemoteStorageResources(){
  BorhanRemoteStorageResources.super_.call(this);
  this.resources = null;
};
module.exports.BorhanRemoteStorageResources = BorhanRemoteStorageResources;

util.inherits(BorhanRemoteStorageResources, BorhanContentResource);


/**
 */
function BorhanReportFilter(){
  BorhanReportFilter.super_.call(this);
};
module.exports.BorhanReportFilter = BorhanReportFilter;

util.inherits(BorhanReportFilter, BorhanReportBaseFilter);


/**
 * @param  comparison  string    .
 */
function BorhanSearchComparableCondition(){
  BorhanSearchComparableCondition.super_.call(this);
  this.comparison = null;
};
module.exports.BorhanSearchComparableCondition = BorhanSearchComparableCondition;

util.inherits(BorhanSearchComparableCondition, BorhanSearchCondition);


/**
 */
function BorhanShortLinkFilter(){
  BorhanShortLinkFilter.super_.call(this);
};
module.exports.BorhanShortLinkFilter = BorhanShortLinkFilter;

util.inherits(BorhanShortLinkFilter, BorhanShortLinkBaseFilter);


/**
 */
function BorhanStorageProfileFilter(){
  BorhanStorageProfileFilter.super_.call(this);
};
module.exports.BorhanStorageProfileFilter = BorhanStorageProfileFilter;

util.inherits(BorhanStorageProfileFilter, BorhanStorageProfileBaseFilter);


/**
 * @param  content  string    Textual content
 *  	 .
 */
function BorhanStringResource(){
  BorhanStringResource.super_.call(this);
  this.content = null;
};
module.exports.BorhanStringResource = BorhanStringResource;

util.inherits(BorhanStringResource, BorhanContentResource);


/**
 */
function BorhanUiConfFilter(){
  BorhanUiConfFilter.super_.call(this);
};
module.exports.BorhanUiConfFilter = BorhanUiConfFilter;

util.inherits(BorhanUiConfFilter, BorhanUiConfBaseFilter);


/**
 */
function BorhanUploadTokenFilter(){
  BorhanUploadTokenFilter.super_.call(this);
};
module.exports.BorhanUploadTokenFilter = BorhanUploadTokenFilter;

util.inherits(BorhanUploadTokenFilter, BorhanUploadTokenBaseFilter);


/**
 * @param  idOrScreenNameStartsWith  string    .
 * @param  idEqual  string    .
 * @param  idIn  string    .
 * @param  loginEnabledEqual  int    .
 * @param  roleIdEqual  string    .
 * @param  roleIdsEqual  string    .
 * @param  roleIdsIn  string    .
 * @param  firstNameOrLastNameStartsWith  string    .
 * @param  permissionNamesMultiLikeOr  string    Permission names filter expression
 *  	 .
 * @param  permissionNamesMultiLikeAnd  string    Permission names filter expression
 *  	 .
 */
function BorhanUserFilter(){
  BorhanUserFilter.super_.call(this);
  this.idOrScreenNameStartsWith = null;
  this.idEqual = null;
  this.idIn = null;
  this.loginEnabledEqual = null;
  this.roleIdEqual = null;
  this.roleIdsEqual = null;
  this.roleIdsIn = null;
  this.firstNameOrLastNameStartsWith = null;
  this.permissionNamesMultiLikeOr = null;
  this.permissionNamesMultiLikeAnd = null;
};
module.exports.BorhanUserFilter = BorhanUserFilter;

util.inherits(BorhanUserFilter, BorhanUserBaseFilter);


/**
 */
function BorhanUserLoginDataFilter(){
  BorhanUserLoginDataFilter.super_.call(this);
};
module.exports.BorhanUserLoginDataFilter = BorhanUserLoginDataFilter;

util.inherits(BorhanUserLoginDataFilter, BorhanUserLoginDataBaseFilter);


/**
 */
function BorhanUserRoleFilter(){
  BorhanUserRoleFilter.super_.call(this);
};
module.exports.BorhanUserRoleFilter = BorhanUserRoleFilter;

util.inherits(BorhanUserRoleFilter, BorhanUserRoleBaseFilter);


/**
 */
function BorhanVirusScanProfileFilter(){
  BorhanVirusScanProfileFilter.super_.call(this);
};
module.exports.BorhanVirusScanProfileFilter = BorhanVirusScanProfileFilter;

util.inherits(BorhanVirusScanProfileFilter, BorhanVirusScanProfileBaseFilter);


/**
 */
function BorhanWidgetFilter(){
  BorhanWidgetFilter.super_.call(this);
};
module.exports.BorhanWidgetFilter = BorhanWidgetFilter;

util.inherits(BorhanWidgetFilter, BorhanWidgetBaseFilter);


/**
 * @param  protocolTypeEqual  string    .
 * @param  protocolTypeIn  string    .
 * @param  titleLike  string    .
 * @param  titleMultiLikeOr  string    .
 * @param  titleMultiLikeAnd  string    .
 * @param  endTimeGreaterThanOrEqual  int    .
 * @param  endTimeLessThanOrEqual  int    .
 * @param  durationGreaterThanOrEqual  int    .
 * @param  durationLessThanOrEqual  int    .
 */
function BorhanAdCuePointBaseFilter(){
  BorhanAdCuePointBaseFilter.super_.call(this);
  this.protocolTypeEqual = null;
  this.protocolTypeIn = null;
  this.titleLike = null;
  this.titleMultiLikeOr = null;
  this.titleMultiLikeAnd = null;
  this.endTimeGreaterThanOrEqual = null;
  this.endTimeLessThanOrEqual = null;
  this.durationGreaterThanOrEqual = null;
  this.durationLessThanOrEqual = null;
};
module.exports.BorhanAdCuePointBaseFilter = BorhanAdCuePointBaseFilter;

util.inherits(BorhanAdCuePointBaseFilter, BorhanCuePointFilter);


/**
 */
function BorhanAdminUserBaseFilter(){
  BorhanAdminUserBaseFilter.super_.call(this);
};
module.exports.BorhanAdminUserBaseFilter = BorhanAdminUserBaseFilter;

util.inherits(BorhanAdminUserBaseFilter, BorhanUserFilter);


/**
 */
function BorhanAmazonS3StorageProfileBaseFilter(){
  BorhanAmazonS3StorageProfileBaseFilter.super_.call(this);
};
module.exports.BorhanAmazonS3StorageProfileBaseFilter = BorhanAmazonS3StorageProfileBaseFilter;

util.inherits(BorhanAmazonS3StorageProfileBaseFilter, BorhanStorageProfileFilter);


/**
 * @param  parentIdEqual  string    .
 * @param  parentIdIn  string    .
 * @param  textLike  string    .
 * @param  textMultiLikeOr  string    .
 * @param  textMultiLikeAnd  string    .
 * @param  endTimeGreaterThanOrEqual  int    .
 * @param  endTimeLessThanOrEqual  int    .
 * @param  durationGreaterThanOrEqual  int    .
 * @param  durationLessThanOrEqual  int    .
 */
function BorhanAnnotationBaseFilter(){
  BorhanAnnotationBaseFilter.super_.call(this);
  this.parentIdEqual = null;
  this.parentIdIn = null;
  this.textLike = null;
  this.textMultiLikeOr = null;
  this.textMultiLikeAnd = null;
  this.endTimeGreaterThanOrEqual = null;
  this.endTimeLessThanOrEqual = null;
  this.durationGreaterThanOrEqual = null;
  this.durationLessThanOrEqual = null;
};
module.exports.BorhanAnnotationBaseFilter = BorhanAnnotationBaseFilter;

util.inherits(BorhanAnnotationBaseFilter, BorhanCuePointFilter);


/**
 */
function BorhanApiActionPermissionItemBaseFilter(){
  BorhanApiActionPermissionItemBaseFilter.super_.call(this);
};
module.exports.BorhanApiActionPermissionItemBaseFilter = BorhanApiActionPermissionItemBaseFilter;

util.inherits(BorhanApiActionPermissionItemBaseFilter, BorhanPermissionItemFilter);


/**
 */
function BorhanApiParameterPermissionItemBaseFilter(){
  BorhanApiParameterPermissionItemBaseFilter.super_.call(this);
};
module.exports.BorhanApiParameterPermissionItemBaseFilter = BorhanApiParameterPermissionItemBaseFilter;

util.inherits(BorhanApiParameterPermissionItemBaseFilter, BorhanPermissionItemFilter);


/**
 */
function BorhanAssetParamsOutputBaseFilter(){
  BorhanAssetParamsOutputBaseFilter.super_.call(this);
};
module.exports.BorhanAssetParamsOutputBaseFilter = BorhanAssetParamsOutputBaseFilter;

util.inherits(BorhanAssetParamsOutputBaseFilter, BorhanAssetParamsFilter);


/**
 * @param  formatEqual  string    .
 * @param  formatIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  statusNotIn  string    .
 */
function BorhanAttachmentAssetBaseFilter(){
  BorhanAttachmentAssetBaseFilter.super_.call(this);
  this.formatEqual = null;
  this.formatIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.statusNotIn = null;
};
module.exports.BorhanAttachmentAssetBaseFilter = BorhanAttachmentAssetBaseFilter;

util.inherits(BorhanAttachmentAssetBaseFilter, BorhanAssetFilter);


/**
 * @param  jobTypeAndSubTypeIn  string    .
 */
function BorhanBatchJobFilterExt(){
  BorhanBatchJobFilterExt.super_.call(this);
  this.jobTypeAndSubTypeIn = null;
};
module.exports.BorhanBatchJobFilterExt = BorhanBatchJobFilterExt;

util.inherits(BorhanBatchJobFilterExt, BorhanBatchJobFilter);


/**
 * @param  captionParamsIdEqual  int    .
 * @param  captionParamsIdIn  string    .
 * @param  formatEqual  string    .
 * @param  formatIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  statusNotIn  string    .
 */
function BorhanCaptionAssetBaseFilter(){
  BorhanCaptionAssetBaseFilter.super_.call(this);
  this.captionParamsIdEqual = null;
  this.captionParamsIdIn = null;
  this.formatEqual = null;
  this.formatIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.statusNotIn = null;
};
module.exports.BorhanCaptionAssetBaseFilter = BorhanCaptionAssetBaseFilter;

util.inherits(BorhanCaptionAssetBaseFilter, BorhanAssetFilter);


/**
 * @param  formatEqual  string    .
 * @param  formatIn  string    .
 */
function BorhanCaptionParamsBaseFilter(){
  BorhanCaptionParamsBaseFilter.super_.call(this);
  this.formatEqual = null;
  this.formatIn = null;
};
module.exports.BorhanCaptionParamsBaseFilter = BorhanCaptionParamsBaseFilter;

util.inherits(BorhanCaptionParamsBaseFilter, BorhanAssetParamsFilter);


/**
 * @param  codeLike  string    .
 * @param  codeMultiLikeOr  string    .
 * @param  codeMultiLikeAnd  string    .
 * @param  codeEqual  string    .
 * @param  codeIn  string    .
 * @param  descriptionLike  string    .
 * @param  descriptionMultiLikeOr  string    .
 * @param  descriptionMultiLikeAnd  string    .
 * @param  endTimeGreaterThanOrEqual  int    .
 * @param  endTimeLessThanOrEqual  int    .
 * @param  durationGreaterThanOrEqual  int    .
 * @param  durationLessThanOrEqual  int    .
 */
function BorhanCodeCuePointBaseFilter(){
  BorhanCodeCuePointBaseFilter.super_.call(this);
  this.codeLike = null;
  this.codeMultiLikeOr = null;
  this.codeMultiLikeAnd = null;
  this.codeEqual = null;
  this.codeIn = null;
  this.descriptionLike = null;
  this.descriptionMultiLikeOr = null;
  this.descriptionMultiLikeAnd = null;
  this.endTimeGreaterThanOrEqual = null;
  this.endTimeLessThanOrEqual = null;
  this.durationGreaterThanOrEqual = null;
  this.durationLessThanOrEqual = null;
};
module.exports.BorhanCodeCuePointBaseFilter = BorhanCodeCuePointBaseFilter;

util.inherits(BorhanCodeCuePointBaseFilter, BorhanCuePointFilter);


/**
 */
function BorhanConfigurableDistributionProfileBaseFilter(){
  BorhanConfigurableDistributionProfileBaseFilter.super_.call(this);
};
module.exports.BorhanConfigurableDistributionProfileBaseFilter = BorhanConfigurableDistributionProfileBaseFilter;

util.inherits(BorhanConfigurableDistributionProfileBaseFilter, BorhanDistributionProfileFilter);


/**
 */
function BorhanDataEntryBaseFilter(){
  BorhanDataEntryBaseFilter.super_.call(this);
};
module.exports.BorhanDataEntryBaseFilter = BorhanDataEntryBaseFilter;

util.inherits(BorhanDataEntryBaseFilter, BorhanBaseEntryFilter);


/**
 * @param  documentTypeEqual  int    .
 * @param  documentTypeIn  string    .
 * @param  assetParamsIdsMatchOr  string    .
 * @param  assetParamsIdsMatchAnd  string    .
 */
function BorhanDocumentEntryBaseFilter(){
  BorhanDocumentEntryBaseFilter.super_.call(this);
  this.documentTypeEqual = null;
  this.documentTypeIn = null;
  this.assetParamsIdsMatchOr = null;
  this.assetParamsIdsMatchAnd = null;
};
module.exports.BorhanDocumentEntryBaseFilter = BorhanDocumentEntryBaseFilter;

util.inherits(BorhanDocumentEntryBaseFilter, BorhanBaseEntryFilter);


/**
 * @param  dropFolderFileId  int    Id of the drop folder file object
 *  	 .
 */
function BorhanDropFolderFileResource(){
  BorhanDropFolderFileResource.super_.call(this);
  this.dropFolderFileId = null;
};
module.exports.BorhanDropFolderFileResource = BorhanDropFolderFileResource;

util.inherits(BorhanDropFolderFileResource, BorhanDataCenterContentResource);


/**
 */
function BorhanEmailNotificationTemplateBaseFilter(){
  BorhanEmailNotificationTemplateBaseFilter.super_.call(this);
};
module.exports.BorhanEmailNotificationTemplateBaseFilter = BorhanEmailNotificationTemplateBaseFilter;

util.inherits(BorhanEmailNotificationTemplateBaseFilter, BorhanEventNotificationTemplateFilter);


/**
 * @param  externalSourceType  string    The source type of the external media
 *  	  (insertOnly).
 * @param  assetParamsIds  string    Comma separated asset params ids that exists for this external media entry
 *  	  (readOnly).
 */
function BorhanExternalMediaEntry(){
  BorhanExternalMediaEntry.super_.call(this);
  this.externalSourceType = null;
  this.assetParamsIds = null;
};
module.exports.BorhanExternalMediaEntry = BorhanExternalMediaEntry;

util.inherits(BorhanExternalMediaEntry, BorhanMediaEntry);


/**
 * @param  flavorParamsIdEqual  int    .
 * @param  flavorParamsIdIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  statusNotIn  string    .
 */
function BorhanFlavorAssetBaseFilter(){
  BorhanFlavorAssetBaseFilter.super_.call(this);
  this.flavorParamsIdEqual = null;
  this.flavorParamsIdIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.statusNotIn = null;
};
module.exports.BorhanFlavorAssetBaseFilter = BorhanFlavorAssetBaseFilter;

util.inherits(BorhanFlavorAssetBaseFilter, BorhanAssetFilter);


/**
 * @param  formatEqual  string    .
 */
function BorhanFlavorParamsBaseFilter(){
  BorhanFlavorParamsBaseFilter.super_.call(this);
  this.formatEqual = null;
};
module.exports.BorhanFlavorParamsBaseFilter = BorhanFlavorParamsBaseFilter;

util.inherits(BorhanFlavorParamsBaseFilter, BorhanAssetParamsFilter);


/**
 */
function BorhanGenericDistributionProfileBaseFilter(){
  BorhanGenericDistributionProfileBaseFilter.super_.call(this);
};
module.exports.BorhanGenericDistributionProfileBaseFilter = BorhanGenericDistributionProfileBaseFilter;

util.inherits(BorhanGenericDistributionProfileBaseFilter, BorhanDistributionProfileFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  isDefaultEqual  int    .
 * @param  isDefaultIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 */
function BorhanGenericDistributionProviderBaseFilter(){
  BorhanGenericDistributionProviderBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.isDefaultEqual = null;
  this.isDefaultIn = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.BorhanGenericDistributionProviderBaseFilter = BorhanGenericDistributionProviderBaseFilter;

util.inherits(BorhanGenericDistributionProviderBaseFilter, BorhanDistributionProviderFilter);


/**
 */
function BorhanGenericSyndicationFeedBaseFilter(){
  BorhanGenericSyndicationFeedBaseFilter.super_.call(this);
};
module.exports.BorhanGenericSyndicationFeedBaseFilter = BorhanGenericSyndicationFeedBaseFilter;

util.inherits(BorhanGenericSyndicationFeedBaseFilter, BorhanBaseSyndicationFeedFilter);


/**
 */
function BorhanGoogleVideoSyndicationFeedBaseFilter(){
  BorhanGoogleVideoSyndicationFeedBaseFilter.super_.call(this);
};
module.exports.BorhanGoogleVideoSyndicationFeedBaseFilter = BorhanGoogleVideoSyndicationFeedBaseFilter;

util.inherits(BorhanGoogleVideoSyndicationFeedBaseFilter, BorhanBaseSyndicationFeedFilter);


/**
 */
function BorhanHttpNotificationTemplateBaseFilter(){
  BorhanHttpNotificationTemplateBaseFilter.super_.call(this);
};
module.exports.BorhanHttpNotificationTemplateBaseFilter = BorhanHttpNotificationTemplateBaseFilter;

util.inherits(BorhanHttpNotificationTemplateBaseFilter, BorhanEventNotificationTemplateFilter);


/**
 */
function BorhanITunesSyndicationFeedBaseFilter(){
  BorhanITunesSyndicationFeedBaseFilter.super_.call(this);
};
module.exports.BorhanITunesSyndicationFeedBaseFilter = BorhanITunesSyndicationFeedBaseFilter;

util.inherits(BorhanITunesSyndicationFeedBaseFilter, BorhanBaseSyndicationFeedFilter);


/**
 */
function BorhanKontikiStorageProfileBaseFilter(){
  BorhanKontikiStorageProfileBaseFilter.super_.call(this);
};
module.exports.BorhanKontikiStorageProfileBaseFilter = BorhanKontikiStorageProfileBaseFilter;

util.inherits(BorhanKontikiStorageProfileBaseFilter, BorhanStorageProfileFilter);


/**
 * @param  offlineMessage  string    The message to be presented when the stream is offline
 *  	 .
 * @param  recordStatus  int    Recording Status Enabled/Disabled
 *  	  (insertOnly).
 * @param  dvrStatus  int    DVR Status Enabled/Disabled
 *  	  (insertOnly).
 * @param  dvrWindow  int    Window of time which the DVR allows for backwards scrubbing (in minutes)
 *  	  (insertOnly).
 * @param  liveStreamConfigurations  array    Array of key value protocol->live stream url objects
 *  	 .
 * @param  recordedEntryId  string    Recorded entry id
 *  	 .
 * @param  pushPublishEnabled  int    Flag denoting whether entry should be published by the media server
 *  	 .
 */
function BorhanLiveEntry(){
  BorhanLiveEntry.super_.call(this);
  this.offlineMessage = null;
  this.recordStatus = null;
  this.dvrStatus = null;
  this.dvrWindow = null;
  this.liveStreamConfigurations = null;
  this.recordedEntryId = null;
  this.pushPublishEnabled = null;
};
module.exports.BorhanLiveEntry = BorhanLiveEntry;

util.inherits(BorhanLiveEntry, BorhanMediaEntry);


/**
 */
function BorhanPlaylistBaseFilter(){
  BorhanPlaylistBaseFilter.super_.call(this);
};
module.exports.BorhanPlaylistBaseFilter = BorhanPlaylistBaseFilter;

util.inherits(BorhanPlaylistBaseFilter, BorhanBaseEntryFilter);


/**
 */
function BorhanRemoteDropFolderBaseFilter(){
  BorhanRemoteDropFolderBaseFilter.super_.call(this);
};
module.exports.BorhanRemoteDropFolderBaseFilter = BorhanRemoteDropFolderBaseFilter;

util.inherits(BorhanRemoteDropFolderBaseFilter, BorhanDropFolderFilter);


/**
 * @param  localFilePath  string    Full path to the local file 
 *  	 .
 */
function BorhanServerFileResource(){
  BorhanServerFileResource.super_.call(this);
  this.localFilePath = null;
};
module.exports.BorhanServerFileResource = BorhanServerFileResource;

util.inherits(BorhanServerFileResource, BorhanDataCenterContentResource);


/**
 * @param  privateKey  string    SSH private key
 *  	 .
 * @param  publicKey  string    SSH public key
 *  	 .
 * @param  keyPassphrase  string    Passphrase for SSH keys
 *  	 .
 */
function BorhanSshUrlResource(){
  BorhanSshUrlResource.super_.call(this);
  this.privateKey = null;
  this.publicKey = null;
  this.keyPassphrase = null;
};
module.exports.BorhanSshUrlResource = BorhanSshUrlResource;

util.inherits(BorhanSshUrlResource, BorhanUrlResource);


/**
 */
function BorhanSyndicationDistributionProfileBaseFilter(){
  BorhanSyndicationDistributionProfileBaseFilter.super_.call(this);
};
module.exports.BorhanSyndicationDistributionProfileBaseFilter = BorhanSyndicationDistributionProfileBaseFilter;

util.inherits(BorhanSyndicationDistributionProfileBaseFilter, BorhanDistributionProfileFilter);


/**
 */
function BorhanSyndicationDistributionProviderBaseFilter(){
  BorhanSyndicationDistributionProviderBaseFilter.super_.call(this);
};
module.exports.BorhanSyndicationDistributionProviderBaseFilter = BorhanSyndicationDistributionProviderBaseFilter;

util.inherits(BorhanSyndicationDistributionProviderBaseFilter, BorhanDistributionProviderFilter);


/**
 * @param  partnerParentIdEqual  int    .
 * @param  partnerParentIdIn  string    .
 */
function BorhanSystemPartnerFilter(){
  BorhanSystemPartnerFilter.super_.call(this);
  this.partnerParentIdEqual = null;
  this.partnerParentIdIn = null;
};
module.exports.BorhanSystemPartnerFilter = BorhanSystemPartnerFilter;

util.inherits(BorhanSystemPartnerFilter, BorhanPartnerFilter);


/**
 * @param  thumbParamsIdEqual  int    .
 * @param  thumbParamsIdIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  statusNotIn  string    .
 */
function BorhanThumbAssetBaseFilter(){
  BorhanThumbAssetBaseFilter.super_.call(this);
  this.thumbParamsIdEqual = null;
  this.thumbParamsIdIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.statusNotIn = null;
};
module.exports.BorhanThumbAssetBaseFilter = BorhanThumbAssetBaseFilter;

util.inherits(BorhanThumbAssetBaseFilter, BorhanAssetFilter);


/**
 * @param  formatEqual  string    .
 */
function BorhanThumbParamsBaseFilter(){
  BorhanThumbParamsBaseFilter.super_.call(this);
  this.formatEqual = null;
};
module.exports.BorhanThumbParamsBaseFilter = BorhanThumbParamsBaseFilter;

util.inherits(BorhanThumbParamsBaseFilter, BorhanAssetParamsFilter);


/**
 */
function BorhanTubeMogulSyndicationFeedBaseFilter(){
  BorhanTubeMogulSyndicationFeedBaseFilter.super_.call(this);
};
module.exports.BorhanTubeMogulSyndicationFeedBaseFilter = BorhanTubeMogulSyndicationFeedBaseFilter;

util.inherits(BorhanTubeMogulSyndicationFeedBaseFilter, BorhanBaseSyndicationFeedFilter);


/**
 */
function BorhanUiConfAdminBaseFilter(){
  BorhanUiConfAdminBaseFilter.super_.call(this);
};
module.exports.BorhanUiConfAdminBaseFilter = BorhanUiConfAdminBaseFilter;

util.inherits(BorhanUiConfAdminBaseFilter, BorhanUiConfFilter);


/**
 * @param  token  string    Token that returned from upload.upload action or uploadToken.add action. 
 *  	 .
 */
function BorhanUploadedFileTokenResource(){
  BorhanUploadedFileTokenResource.super_.call(this);
  this.token = null;
};
module.exports.BorhanUploadedFileTokenResource = BorhanUploadedFileTokenResource;

util.inherits(BorhanUploadedFileTokenResource, BorhanDataCenterContentResource);


/**
 * @param  groupTypeEq  int    Eq filter for the partner's group type
 *       .
 * @param  groupTypeIn  string    In filter for the partner's group type
 *       .
 * @param  partnerPermissionsExist  string    Filter for partner permissions- filter contains comma-separated string of permission names which the returned partners should have.
 *       .
 */
function BorhanVarConsolePartnerFilter(){
  BorhanVarConsolePartnerFilter.super_.call(this);
  this.groupTypeEq = null;
  this.groupTypeIn = null;
  this.partnerPermissionsExist = null;
};
module.exports.BorhanVarConsolePartnerFilter = BorhanVarConsolePartnerFilter;

util.inherits(BorhanVarConsolePartnerFilter, BorhanPartnerFilter);


/**
 * @param  token  string    Token that returned from media server such as FMS or red5.
 *  	 .
 */
function BorhanWebcamTokenResource(){
  BorhanWebcamTokenResource.super_.call(this);
  this.token = null;
};
module.exports.BorhanWebcamTokenResource = BorhanWebcamTokenResource;

util.inherits(BorhanWebcamTokenResource, BorhanDataCenterContentResource);


/**
 */
function BorhanWebexDropFolderBaseFilter(){
  BorhanWebexDropFolderBaseFilter.super_.call(this);
};
module.exports.BorhanWebexDropFolderBaseFilter = BorhanWebexDropFolderBaseFilter;

util.inherits(BorhanWebexDropFolderBaseFilter, BorhanDropFolderFilter);


/**
 */
function BorhanWebexDropFolderFileBaseFilter(){
  BorhanWebexDropFolderFileBaseFilter.super_.call(this);
};
module.exports.BorhanWebexDropFolderFileBaseFilter = BorhanWebexDropFolderFileBaseFilter;

util.inherits(BorhanWebexDropFolderFileBaseFilter, BorhanDropFolderFileFilter);


/**
 */
function BorhanWidevineProfileBaseFilter(){
  BorhanWidevineProfileBaseFilter.super_.call(this);
};
module.exports.BorhanWidevineProfileBaseFilter = BorhanWidevineProfileBaseFilter;

util.inherits(BorhanWidevineProfileBaseFilter, BorhanDrmProfileFilter);


/**
 */
function BorhanYahooSyndicationFeedBaseFilter(){
  BorhanYahooSyndicationFeedBaseFilter.super_.call(this);
};
module.exports.BorhanYahooSyndicationFeedBaseFilter = BorhanYahooSyndicationFeedBaseFilter;

util.inherits(BorhanYahooSyndicationFeedBaseFilter, BorhanBaseSyndicationFeedFilter);


/**
 */
function BorhanAdCuePointFilter(){
  BorhanAdCuePointFilter.super_.call(this);
};
module.exports.BorhanAdCuePointFilter = BorhanAdCuePointFilter;

util.inherits(BorhanAdCuePointFilter, BorhanAdCuePointBaseFilter);


/**
 */
function BorhanAdminUserFilter(){
  BorhanAdminUserFilter.super_.call(this);
};
module.exports.BorhanAdminUserFilter = BorhanAdminUserFilter;

util.inherits(BorhanAdminUserFilter, BorhanAdminUserBaseFilter);


/**
 */
function BorhanAmazonS3StorageProfileFilter(){
  BorhanAmazonS3StorageProfileFilter.super_.call(this);
};
module.exports.BorhanAmazonS3StorageProfileFilter = BorhanAmazonS3StorageProfileFilter;

util.inherits(BorhanAmazonS3StorageProfileFilter, BorhanAmazonS3StorageProfileBaseFilter);


/**
 */
function BorhanAnnotationFilter(){
  BorhanAnnotationFilter.super_.call(this);
};
module.exports.BorhanAnnotationFilter = BorhanAnnotationFilter;

util.inherits(BorhanAnnotationFilter, BorhanAnnotationBaseFilter);


/**
 */
function BorhanApiActionPermissionItemFilter(){
  BorhanApiActionPermissionItemFilter.super_.call(this);
};
module.exports.BorhanApiActionPermissionItemFilter = BorhanApiActionPermissionItemFilter;

util.inherits(BorhanApiActionPermissionItemFilter, BorhanApiActionPermissionItemBaseFilter);


/**
 */
function BorhanApiParameterPermissionItemFilter(){
  BorhanApiParameterPermissionItemFilter.super_.call(this);
};
module.exports.BorhanApiParameterPermissionItemFilter = BorhanApiParameterPermissionItemFilter;

util.inherits(BorhanApiParameterPermissionItemFilter, BorhanApiParameterPermissionItemBaseFilter);


/**
 */
function BorhanAssetParamsOutputFilter(){
  BorhanAssetParamsOutputFilter.super_.call(this);
};
module.exports.BorhanAssetParamsOutputFilter = BorhanAssetParamsOutputFilter;

util.inherits(BorhanAssetParamsOutputFilter, BorhanAssetParamsOutputBaseFilter);


/**
 */
function BorhanAttachmentAssetFilter(){
  BorhanAttachmentAssetFilter.super_.call(this);
};
module.exports.BorhanAttachmentAssetFilter = BorhanAttachmentAssetFilter;

util.inherits(BorhanAttachmentAssetFilter, BorhanAttachmentAssetBaseFilter);


/**
 */
function BorhanCaptionAssetFilter(){
  BorhanCaptionAssetFilter.super_.call(this);
};
module.exports.BorhanCaptionAssetFilter = BorhanCaptionAssetFilter;

util.inherits(BorhanCaptionAssetFilter, BorhanCaptionAssetBaseFilter);


/**
 */
function BorhanCaptionParamsFilter(){
  BorhanCaptionParamsFilter.super_.call(this);
};
module.exports.BorhanCaptionParamsFilter = BorhanCaptionParamsFilter;

util.inherits(BorhanCaptionParamsFilter, BorhanCaptionParamsBaseFilter);


/**
 */
function BorhanCodeCuePointFilter(){
  BorhanCodeCuePointFilter.super_.call(this);
};
module.exports.BorhanCodeCuePointFilter = BorhanCodeCuePointFilter;

util.inherits(BorhanCodeCuePointFilter, BorhanCodeCuePointBaseFilter);


/**
 */
function BorhanConfigurableDistributionProfileFilter(){
  BorhanConfigurableDistributionProfileFilter.super_.call(this);
};
module.exports.BorhanConfigurableDistributionProfileFilter = BorhanConfigurableDistributionProfileFilter;

util.inherits(BorhanConfigurableDistributionProfileFilter, BorhanConfigurableDistributionProfileBaseFilter);


/**
 */
function BorhanDataEntryFilter(){
  BorhanDataEntryFilter.super_.call(this);
};
module.exports.BorhanDataEntryFilter = BorhanDataEntryFilter;

util.inherits(BorhanDataEntryFilter, BorhanDataEntryBaseFilter);


/**
 */
function BorhanDocumentEntryFilter(){
  BorhanDocumentEntryFilter.super_.call(this);
};
module.exports.BorhanDocumentEntryFilter = BorhanDocumentEntryFilter;

util.inherits(BorhanDocumentEntryFilter, BorhanDocumentEntryBaseFilter);


/**
 */
function BorhanEmailNotificationTemplateFilter(){
  BorhanEmailNotificationTemplateFilter.super_.call(this);
};
module.exports.BorhanEmailNotificationTemplateFilter = BorhanEmailNotificationTemplateFilter;

util.inherits(BorhanEmailNotificationTemplateFilter, BorhanEmailNotificationTemplateBaseFilter);


/**
 */
function BorhanFlavorAssetFilter(){
  BorhanFlavorAssetFilter.super_.call(this);
};
module.exports.BorhanFlavorAssetFilter = BorhanFlavorAssetFilter;

util.inherits(BorhanFlavorAssetFilter, BorhanFlavorAssetBaseFilter);


/**
 */
function BorhanFlavorParamsFilter(){
  BorhanFlavorParamsFilter.super_.call(this);
};
module.exports.BorhanFlavorParamsFilter = BorhanFlavorParamsFilter;

util.inherits(BorhanFlavorParamsFilter, BorhanFlavorParamsBaseFilter);


/**
 */
function BorhanGenericDistributionProfileFilter(){
  BorhanGenericDistributionProfileFilter.super_.call(this);
};
module.exports.BorhanGenericDistributionProfileFilter = BorhanGenericDistributionProfileFilter;

util.inherits(BorhanGenericDistributionProfileFilter, BorhanGenericDistributionProfileBaseFilter);


/**
 */
function BorhanGenericDistributionProviderFilter(){
  BorhanGenericDistributionProviderFilter.super_.call(this);
};
module.exports.BorhanGenericDistributionProviderFilter = BorhanGenericDistributionProviderFilter;

util.inherits(BorhanGenericDistributionProviderFilter, BorhanGenericDistributionProviderBaseFilter);


/**
 */
function BorhanGenericSyndicationFeedFilter(){
  BorhanGenericSyndicationFeedFilter.super_.call(this);
};
module.exports.BorhanGenericSyndicationFeedFilter = BorhanGenericSyndicationFeedFilter;

util.inherits(BorhanGenericSyndicationFeedFilter, BorhanGenericSyndicationFeedBaseFilter);


/**
 */
function BorhanGoogleVideoSyndicationFeedFilter(){
  BorhanGoogleVideoSyndicationFeedFilter.super_.call(this);
};
module.exports.BorhanGoogleVideoSyndicationFeedFilter = BorhanGoogleVideoSyndicationFeedFilter;

util.inherits(BorhanGoogleVideoSyndicationFeedFilter, BorhanGoogleVideoSyndicationFeedBaseFilter);


/**
 */
function BorhanHttpNotificationTemplateFilter(){
  BorhanHttpNotificationTemplateFilter.super_.call(this);
};
module.exports.BorhanHttpNotificationTemplateFilter = BorhanHttpNotificationTemplateFilter;

util.inherits(BorhanHttpNotificationTemplateFilter, BorhanHttpNotificationTemplateBaseFilter);


/**
 */
function BorhanITunesSyndicationFeedFilter(){
  BorhanITunesSyndicationFeedFilter.super_.call(this);
};
module.exports.BorhanITunesSyndicationFeedFilter = BorhanITunesSyndicationFeedFilter;

util.inherits(BorhanITunesSyndicationFeedFilter, BorhanITunesSyndicationFeedBaseFilter);


/**
 */
function BorhanKontikiStorageProfileFilter(){
  BorhanKontikiStorageProfileFilter.super_.call(this);
};
module.exports.BorhanKontikiStorageProfileFilter = BorhanKontikiStorageProfileFilter;

util.inherits(BorhanKontikiStorageProfileFilter, BorhanKontikiStorageProfileBaseFilter);


/**
 * @param  playlistId  string    Playlist id to be played
 *  	 .
 * @param  repeat  int    Indicates that the segments should be repeated for ever
 *  	 .
 */
function BorhanLiveChannel(){
  BorhanLiveChannel.super_.call(this);
  this.playlistId = null;
  this.repeat = null;
};
module.exports.BorhanLiveChannel = BorhanLiveChannel;

util.inherits(BorhanLiveChannel, BorhanLiveEntry);


/**
 * @param  streamRemoteId  string    The stream id as provided by the provider
 *  	  (readOnly).
 * @param  streamRemoteBackupId  string    The backup stream id as provided by the provider
 *  	  (readOnly).
 * @param  bitrates  array    Array of supported bitrates
 *  	 .
 * @param  primaryBroadcastingUrl  string    .
 * @param  secondaryBroadcastingUrl  string    .
 * @param  streamName  string    .
 * @param  streamUrl  string    The stream url
 *  	 .
 * @param  hlsStreamUrl  string    HLS URL - URL for live stream playback on mobile device
 *  	 .
 * @param  urlManager  string    URL Manager to handle the live stream URL (for instance, add token)
 *  	 .
 * @param  encodingIP1  string    The broadcast primary ip
 *  	 .
 * @param  encodingIP2  string    The broadcast secondary ip
 *  	 .
 * @param  streamPassword  string    The broadcast password
 *  	 .
 * @param  streamUsername  string    The broadcast username
 *  	  (readOnly).
 */
function BorhanLiveStreamEntry(){
  BorhanLiveStreamEntry.super_.call(this);
  this.streamRemoteId = null;
  this.streamRemoteBackupId = null;
  this.bitrates = null;
  this.primaryBroadcastingUrl = null;
  this.secondaryBroadcastingUrl = null;
  this.streamName = null;
  this.streamUrl = null;
  this.hlsStreamUrl = null;
  this.urlManager = null;
  this.encodingIP1 = null;
  this.encodingIP2 = null;
  this.streamPassword = null;
  this.streamUsername = null;
};
module.exports.BorhanLiveStreamEntry = BorhanLiveStreamEntry;

util.inherits(BorhanLiveStreamEntry, BorhanLiveEntry);


/**
 */
function BorhanPlaylistFilter(){
  BorhanPlaylistFilter.super_.call(this);
};
module.exports.BorhanPlaylistFilter = BorhanPlaylistFilter;

util.inherits(BorhanPlaylistFilter, BorhanPlaylistBaseFilter);


/**
 */
function BorhanRemoteDropFolderFilter(){
  BorhanRemoteDropFolderFilter.super_.call(this);
};
module.exports.BorhanRemoteDropFolderFilter = BorhanRemoteDropFolderFilter;

util.inherits(BorhanRemoteDropFolderFilter, BorhanRemoteDropFolderBaseFilter);


/**
 */
function BorhanSyndicationDistributionProfileFilter(){
  BorhanSyndicationDistributionProfileFilter.super_.call(this);
};
module.exports.BorhanSyndicationDistributionProfileFilter = BorhanSyndicationDistributionProfileFilter;

util.inherits(BorhanSyndicationDistributionProfileFilter, BorhanSyndicationDistributionProfileBaseFilter);


/**
 */
function BorhanSyndicationDistributionProviderFilter(){
  BorhanSyndicationDistributionProviderFilter.super_.call(this);
};
module.exports.BorhanSyndicationDistributionProviderFilter = BorhanSyndicationDistributionProviderFilter;

util.inherits(BorhanSyndicationDistributionProviderFilter, BorhanSyndicationDistributionProviderBaseFilter);


/**
 */
function BorhanThumbAssetFilter(){
  BorhanThumbAssetFilter.super_.call(this);
};
module.exports.BorhanThumbAssetFilter = BorhanThumbAssetFilter;

util.inherits(BorhanThumbAssetFilter, BorhanThumbAssetBaseFilter);


/**
 */
function BorhanThumbParamsFilter(){
  BorhanThumbParamsFilter.super_.call(this);
};
module.exports.BorhanThumbParamsFilter = BorhanThumbParamsFilter;

util.inherits(BorhanThumbParamsFilter, BorhanThumbParamsBaseFilter);


/**
 */
function BorhanTubeMogulSyndicationFeedFilter(){
  BorhanTubeMogulSyndicationFeedFilter.super_.call(this);
};
module.exports.BorhanTubeMogulSyndicationFeedFilter = BorhanTubeMogulSyndicationFeedFilter;

util.inherits(BorhanTubeMogulSyndicationFeedFilter, BorhanTubeMogulSyndicationFeedBaseFilter);


/**
 */
function BorhanUiConfAdminFilter(){
  BorhanUiConfAdminFilter.super_.call(this);
};
module.exports.BorhanUiConfAdminFilter = BorhanUiConfAdminFilter;

util.inherits(BorhanUiConfAdminFilter, BorhanUiConfAdminBaseFilter);


/**
 */
function BorhanWebexDropFolderFileFilter(){
  BorhanWebexDropFolderFileFilter.super_.call(this);
};
module.exports.BorhanWebexDropFolderFileFilter = BorhanWebexDropFolderFileFilter;

util.inherits(BorhanWebexDropFolderFileFilter, BorhanWebexDropFolderFileBaseFilter);


/**
 */
function BorhanWebexDropFolderFilter(){
  BorhanWebexDropFolderFilter.super_.call(this);
};
module.exports.BorhanWebexDropFolderFilter = BorhanWebexDropFolderFilter;

util.inherits(BorhanWebexDropFolderFilter, BorhanWebexDropFolderBaseFilter);


/**
 */
function BorhanWidevineProfileFilter(){
  BorhanWidevineProfileFilter.super_.call(this);
};
module.exports.BorhanWidevineProfileFilter = BorhanWidevineProfileFilter;

util.inherits(BorhanWidevineProfileFilter, BorhanWidevineProfileBaseFilter);


/**
 */
function BorhanYahooSyndicationFeedFilter(){
  BorhanYahooSyndicationFeedFilter.super_.call(this);
};
module.exports.BorhanYahooSyndicationFeedFilter = BorhanYahooSyndicationFeedFilter;

util.inherits(BorhanYahooSyndicationFeedFilter, BorhanYahooSyndicationFeedBaseFilter);


/**
 * @param  contentLike  string    .
 * @param  contentMultiLikeOr  string    .
 * @param  contentMultiLikeAnd  string    .
 * @param  partnerDescriptionLike  string    .
 * @param  partnerDescriptionMultiLikeOr  string    .
 * @param  partnerDescriptionMultiLikeAnd  string    .
 * @param  languageEqual  string    .
 * @param  languageIn  string    .
 * @param  labelEqual  string    .
 * @param  labelIn  string    .
 * @param  startTimeGreaterThanOrEqual  int    .
 * @param  startTimeLessThanOrEqual  int    .
 * @param  endTimeGreaterThanOrEqual  int    .
 * @param  endTimeLessThanOrEqual  int    .
 */
function BorhanCaptionAssetItemFilter(){
  BorhanCaptionAssetItemFilter.super_.call(this);
  this.contentLike = null;
  this.contentMultiLikeOr = null;
  this.contentMultiLikeAnd = null;
  this.partnerDescriptionLike = null;
  this.partnerDescriptionMultiLikeOr = null;
  this.partnerDescriptionMultiLikeAnd = null;
  this.languageEqual = null;
  this.languageIn = null;
  this.labelEqual = null;
  this.labelIn = null;
  this.startTimeGreaterThanOrEqual = null;
  this.startTimeLessThanOrEqual = null;
  this.endTimeGreaterThanOrEqual = null;
  this.endTimeLessThanOrEqual = null;
};
module.exports.BorhanCaptionAssetItemFilter = BorhanCaptionAssetItemFilter;

util.inherits(BorhanCaptionAssetItemFilter, BorhanCaptionAssetFilter);


/**
 */
function BorhanDocumentFlavorParamsBaseFilter(){
  BorhanDocumentFlavorParamsBaseFilter.super_.call(this);
};
module.exports.BorhanDocumentFlavorParamsBaseFilter = BorhanDocumentFlavorParamsBaseFilter;

util.inherits(BorhanDocumentFlavorParamsBaseFilter, BorhanFlavorParamsFilter);


/**
 * @param  flavorParamsIdEqual  int    .
 * @param  flavorParamsVersionEqual  string    .
 * @param  flavorAssetIdEqual  string    .
 * @param  flavorAssetVersionEqual  string    .
 */
function BorhanFlavorParamsOutputBaseFilter(){
  BorhanFlavorParamsOutputBaseFilter.super_.call(this);
  this.flavorParamsIdEqual = null;
  this.flavorParamsVersionEqual = null;
  this.flavorAssetIdEqual = null;
  this.flavorAssetVersionEqual = null;
};
module.exports.BorhanFlavorParamsOutputBaseFilter = BorhanFlavorParamsOutputBaseFilter;

util.inherits(BorhanFlavorParamsOutputBaseFilter, BorhanFlavorParamsFilter);


/**
 */
function BorhanFtpDropFolderBaseFilter(){
  BorhanFtpDropFolderBaseFilter.super_.call(this);
};
module.exports.BorhanFtpDropFolderBaseFilter = BorhanFtpDropFolderBaseFilter;

util.inherits(BorhanFtpDropFolderBaseFilter, BorhanRemoteDropFolderFilter);


/**
 */
function BorhanGenericXsltSyndicationFeedBaseFilter(){
  BorhanGenericXsltSyndicationFeedBaseFilter.super_.call(this);
};
module.exports.BorhanGenericXsltSyndicationFeedBaseFilter = BorhanGenericXsltSyndicationFeedBaseFilter;

util.inherits(BorhanGenericXsltSyndicationFeedBaseFilter, BorhanGenericSyndicationFeedFilter);


/**
 */
function BorhanImageFlavorParamsBaseFilter(){
  BorhanImageFlavorParamsBaseFilter.super_.call(this);
};
module.exports.BorhanImageFlavorParamsBaseFilter = BorhanImageFlavorParamsBaseFilter;

util.inherits(BorhanImageFlavorParamsBaseFilter, BorhanFlavorParamsFilter);


/**
 */
function BorhanLiveAssetBaseFilter(){
  BorhanLiveAssetBaseFilter.super_.call(this);
};
module.exports.BorhanLiveAssetBaseFilter = BorhanLiveAssetBaseFilter;

util.inherits(BorhanLiveAssetBaseFilter, BorhanFlavorAssetFilter);


/**
 */
function BorhanLiveParamsBaseFilter(){
  BorhanLiveParamsBaseFilter.super_.call(this);
};
module.exports.BorhanLiveParamsBaseFilter = BorhanLiveParamsBaseFilter;

util.inherits(BorhanLiveParamsBaseFilter, BorhanFlavorParamsFilter);


/**
 */
function BorhanLiveStreamAdminEntry(){
  BorhanLiveStreamAdminEntry.super_.call(this);
};
module.exports.BorhanLiveStreamAdminEntry = BorhanLiveStreamAdminEntry;

util.inherits(BorhanLiveStreamAdminEntry, BorhanLiveStreamEntry);


/**
 */
function BorhanMediaFlavorParamsBaseFilter(){
  BorhanMediaFlavorParamsBaseFilter.super_.call(this);
};
module.exports.BorhanMediaFlavorParamsBaseFilter = BorhanMediaFlavorParamsBaseFilter;

util.inherits(BorhanMediaFlavorParamsBaseFilter, BorhanFlavorParamsFilter);


/**
 */
function BorhanMixEntryBaseFilter(){
  BorhanMixEntryBaseFilter.super_.call(this);
};
module.exports.BorhanMixEntryBaseFilter = BorhanMixEntryBaseFilter;

util.inherits(BorhanMixEntryBaseFilter, BorhanPlayableEntryFilter);


/**
 */
function BorhanPdfFlavorParamsBaseFilter(){
  BorhanPdfFlavorParamsBaseFilter.super_.call(this);
};
module.exports.BorhanPdfFlavorParamsBaseFilter = BorhanPdfFlavorParamsBaseFilter;

util.inherits(BorhanPdfFlavorParamsBaseFilter, BorhanFlavorParamsFilter);


/**
 */
function BorhanSshDropFolderBaseFilter(){
  BorhanSshDropFolderBaseFilter.super_.call(this);
};
module.exports.BorhanSshDropFolderBaseFilter = BorhanSshDropFolderBaseFilter;

util.inherits(BorhanSshDropFolderBaseFilter, BorhanRemoteDropFolderFilter);


/**
 */
function BorhanSwfFlavorParamsBaseFilter(){
  BorhanSwfFlavorParamsBaseFilter.super_.call(this);
};
module.exports.BorhanSwfFlavorParamsBaseFilter = BorhanSwfFlavorParamsBaseFilter;

util.inherits(BorhanSwfFlavorParamsBaseFilter, BorhanFlavorParamsFilter);


/**
 * @param  thumbParamsIdEqual  int    .
 * @param  thumbParamsVersionEqual  string    .
 * @param  thumbAssetIdEqual  string    .
 * @param  thumbAssetVersionEqual  string    .
 */
function BorhanThumbParamsOutputBaseFilter(){
  BorhanThumbParamsOutputBaseFilter.super_.call(this);
  this.thumbParamsIdEqual = null;
  this.thumbParamsVersionEqual = null;
  this.thumbAssetIdEqual = null;
  this.thumbAssetVersionEqual = null;
};
module.exports.BorhanThumbParamsOutputBaseFilter = BorhanThumbParamsOutputBaseFilter;

util.inherits(BorhanThumbParamsOutputBaseFilter, BorhanThumbParamsFilter);


/**
 */
function BorhanWidevineFlavorAssetBaseFilter(){
  BorhanWidevineFlavorAssetBaseFilter.super_.call(this);
};
module.exports.BorhanWidevineFlavorAssetBaseFilter = BorhanWidevineFlavorAssetBaseFilter;

util.inherits(BorhanWidevineFlavorAssetBaseFilter, BorhanFlavorAssetFilter);


/**
 */
function BorhanWidevineFlavorParamsBaseFilter(){
  BorhanWidevineFlavorParamsBaseFilter.super_.call(this);
};
module.exports.BorhanWidevineFlavorParamsBaseFilter = BorhanWidevineFlavorParamsBaseFilter;

util.inherits(BorhanWidevineFlavorParamsBaseFilter, BorhanFlavorParamsFilter);


/**
 */
function BorhanDocumentFlavorParamsFilter(){
  BorhanDocumentFlavorParamsFilter.super_.call(this);
};
module.exports.BorhanDocumentFlavorParamsFilter = BorhanDocumentFlavorParamsFilter;

util.inherits(BorhanDocumentFlavorParamsFilter, BorhanDocumentFlavorParamsBaseFilter);


/**
 */
function BorhanFlavorParamsOutputFilter(){
  BorhanFlavorParamsOutputFilter.super_.call(this);
};
module.exports.BorhanFlavorParamsOutputFilter = BorhanFlavorParamsOutputFilter;

util.inherits(BorhanFlavorParamsOutputFilter, BorhanFlavorParamsOutputBaseFilter);


/**
 */
function BorhanFtpDropFolderFilter(){
  BorhanFtpDropFolderFilter.super_.call(this);
};
module.exports.BorhanFtpDropFolderFilter = BorhanFtpDropFolderFilter;

util.inherits(BorhanFtpDropFolderFilter, BorhanFtpDropFolderBaseFilter);


/**
 */
function BorhanGenericXsltSyndicationFeedFilter(){
  BorhanGenericXsltSyndicationFeedFilter.super_.call(this);
};
module.exports.BorhanGenericXsltSyndicationFeedFilter = BorhanGenericXsltSyndicationFeedFilter;

util.inherits(BorhanGenericXsltSyndicationFeedFilter, BorhanGenericXsltSyndicationFeedBaseFilter);


/**
 */
function BorhanImageFlavorParamsFilter(){
  BorhanImageFlavorParamsFilter.super_.call(this);
};
module.exports.BorhanImageFlavorParamsFilter = BorhanImageFlavorParamsFilter;

util.inherits(BorhanImageFlavorParamsFilter, BorhanImageFlavorParamsBaseFilter);


/**
 */
function BorhanLiveAssetFilter(){
  BorhanLiveAssetFilter.super_.call(this);
};
module.exports.BorhanLiveAssetFilter = BorhanLiveAssetFilter;

util.inherits(BorhanLiveAssetFilter, BorhanLiveAssetBaseFilter);


/**
 */
function BorhanLiveParamsFilter(){
  BorhanLiveParamsFilter.super_.call(this);
};
module.exports.BorhanLiveParamsFilter = BorhanLiveParamsFilter;

util.inherits(BorhanLiveParamsFilter, BorhanLiveParamsBaseFilter);


/**
 */
function BorhanMediaFlavorParamsFilter(){
  BorhanMediaFlavorParamsFilter.super_.call(this);
};
module.exports.BorhanMediaFlavorParamsFilter = BorhanMediaFlavorParamsFilter;

util.inherits(BorhanMediaFlavorParamsFilter, BorhanMediaFlavorParamsBaseFilter);


/**
 */
function BorhanMixEntryFilter(){
  BorhanMixEntryFilter.super_.call(this);
};
module.exports.BorhanMixEntryFilter = BorhanMixEntryFilter;

util.inherits(BorhanMixEntryFilter, BorhanMixEntryBaseFilter);


/**
 */
function BorhanPdfFlavorParamsFilter(){
  BorhanPdfFlavorParamsFilter.super_.call(this);
};
module.exports.BorhanPdfFlavorParamsFilter = BorhanPdfFlavorParamsFilter;

util.inherits(BorhanPdfFlavorParamsFilter, BorhanPdfFlavorParamsBaseFilter);


/**
 */
function BorhanSshDropFolderFilter(){
  BorhanSshDropFolderFilter.super_.call(this);
};
module.exports.BorhanSshDropFolderFilter = BorhanSshDropFolderFilter;

util.inherits(BorhanSshDropFolderFilter, BorhanSshDropFolderBaseFilter);


/**
 */
function BorhanSwfFlavorParamsFilter(){
  BorhanSwfFlavorParamsFilter.super_.call(this);
};
module.exports.BorhanSwfFlavorParamsFilter = BorhanSwfFlavorParamsFilter;

util.inherits(BorhanSwfFlavorParamsFilter, BorhanSwfFlavorParamsBaseFilter);


/**
 */
function BorhanThumbParamsOutputFilter(){
  BorhanThumbParamsOutputFilter.super_.call(this);
};
module.exports.BorhanThumbParamsOutputFilter = BorhanThumbParamsOutputFilter;

util.inherits(BorhanThumbParamsOutputFilter, BorhanThumbParamsOutputBaseFilter);


/**
 */
function BorhanWidevineFlavorAssetFilter(){
  BorhanWidevineFlavorAssetFilter.super_.call(this);
};
module.exports.BorhanWidevineFlavorAssetFilter = BorhanWidevineFlavorAssetFilter;

util.inherits(BorhanWidevineFlavorAssetFilter, BorhanWidevineFlavorAssetBaseFilter);


/**
 */
function BorhanWidevineFlavorParamsFilter(){
  BorhanWidevineFlavorParamsFilter.super_.call(this);
};
module.exports.BorhanWidevineFlavorParamsFilter = BorhanWidevineFlavorParamsFilter;

util.inherits(BorhanWidevineFlavorParamsFilter, BorhanWidevineFlavorParamsBaseFilter);


/**
 */
function BorhanDocumentFlavorParamsOutputBaseFilter(){
  BorhanDocumentFlavorParamsOutputBaseFilter.super_.call(this);
};
module.exports.BorhanDocumentFlavorParamsOutputBaseFilter = BorhanDocumentFlavorParamsOutputBaseFilter;

util.inherits(BorhanDocumentFlavorParamsOutputBaseFilter, BorhanFlavorParamsOutputFilter);


/**
 * @param  externalSourceTypeEqual  string    .
 * @param  externalSourceTypeIn  string    .
 * @param  assetParamsIdsMatchOr  string    .
 * @param  assetParamsIdsMatchAnd  string    .
 */
function BorhanExternalMediaEntryBaseFilter(){
  BorhanExternalMediaEntryBaseFilter.super_.call(this);
  this.externalSourceTypeEqual = null;
  this.externalSourceTypeIn = null;
  this.assetParamsIdsMatchOr = null;
  this.assetParamsIdsMatchAnd = null;
};
module.exports.BorhanExternalMediaEntryBaseFilter = BorhanExternalMediaEntryBaseFilter;

util.inherits(BorhanExternalMediaEntryBaseFilter, BorhanMediaEntryFilter);


/**
 */
function BorhanImageFlavorParamsOutputBaseFilter(){
  BorhanImageFlavorParamsOutputBaseFilter.super_.call(this);
};
module.exports.BorhanImageFlavorParamsOutputBaseFilter = BorhanImageFlavorParamsOutputBaseFilter;

util.inherits(BorhanImageFlavorParamsOutputBaseFilter, BorhanFlavorParamsOutputFilter);


/**
 */
function BorhanLiveEntryBaseFilter(){
  BorhanLiveEntryBaseFilter.super_.call(this);
};
module.exports.BorhanLiveEntryBaseFilter = BorhanLiveEntryBaseFilter;

util.inherits(BorhanLiveEntryBaseFilter, BorhanMediaEntryFilter);


/**
 */
function BorhanMediaFlavorParamsOutputBaseFilter(){
  BorhanMediaFlavorParamsOutputBaseFilter.super_.call(this);
};
module.exports.BorhanMediaFlavorParamsOutputBaseFilter = BorhanMediaFlavorParamsOutputBaseFilter;

util.inherits(BorhanMediaFlavorParamsOutputBaseFilter, BorhanFlavorParamsOutputFilter);


/**
 */
function BorhanPdfFlavorParamsOutputBaseFilter(){
  BorhanPdfFlavorParamsOutputBaseFilter.super_.call(this);
};
module.exports.BorhanPdfFlavorParamsOutputBaseFilter = BorhanPdfFlavorParamsOutputBaseFilter;

util.inherits(BorhanPdfFlavorParamsOutputBaseFilter, BorhanFlavorParamsOutputFilter);


/**
 */
function BorhanScpDropFolderBaseFilter(){
  BorhanScpDropFolderBaseFilter.super_.call(this);
};
module.exports.BorhanScpDropFolderBaseFilter = BorhanScpDropFolderBaseFilter;

util.inherits(BorhanScpDropFolderBaseFilter, BorhanSshDropFolderFilter);


/**
 */
function BorhanSftpDropFolderBaseFilter(){
  BorhanSftpDropFolderBaseFilter.super_.call(this);
};
module.exports.BorhanSftpDropFolderBaseFilter = BorhanSftpDropFolderBaseFilter;

util.inherits(BorhanSftpDropFolderBaseFilter, BorhanSshDropFolderFilter);


/**
 */
function BorhanSwfFlavorParamsOutputBaseFilter(){
  BorhanSwfFlavorParamsOutputBaseFilter.super_.call(this);
};
module.exports.BorhanSwfFlavorParamsOutputBaseFilter = BorhanSwfFlavorParamsOutputBaseFilter;

util.inherits(BorhanSwfFlavorParamsOutputBaseFilter, BorhanFlavorParamsOutputFilter);


/**
 */
function BorhanWidevineFlavorParamsOutputBaseFilter(){
  BorhanWidevineFlavorParamsOutputBaseFilter.super_.call(this);
};
module.exports.BorhanWidevineFlavorParamsOutputBaseFilter = BorhanWidevineFlavorParamsOutputBaseFilter;

util.inherits(BorhanWidevineFlavorParamsOutputBaseFilter, BorhanFlavorParamsOutputFilter);


/**
 */
function BorhanDocumentFlavorParamsOutputFilter(){
  BorhanDocumentFlavorParamsOutputFilter.super_.call(this);
};
module.exports.BorhanDocumentFlavorParamsOutputFilter = BorhanDocumentFlavorParamsOutputFilter;

util.inherits(BorhanDocumentFlavorParamsOutputFilter, BorhanDocumentFlavorParamsOutputBaseFilter);


/**
 */
function BorhanExternalMediaEntryFilter(){
  BorhanExternalMediaEntryFilter.super_.call(this);
};
module.exports.BorhanExternalMediaEntryFilter = BorhanExternalMediaEntryFilter;

util.inherits(BorhanExternalMediaEntryFilter, BorhanExternalMediaEntryBaseFilter);


/**
 */
function BorhanImageFlavorParamsOutputFilter(){
  BorhanImageFlavorParamsOutputFilter.super_.call(this);
};
module.exports.BorhanImageFlavorParamsOutputFilter = BorhanImageFlavorParamsOutputFilter;

util.inherits(BorhanImageFlavorParamsOutputFilter, BorhanImageFlavorParamsOutputBaseFilter);


/**
 * @param  isLive  int    .
 */
function BorhanLiveEntryFilter(){
  BorhanLiveEntryFilter.super_.call(this);
  this.isLive = null;
};
module.exports.BorhanLiveEntryFilter = BorhanLiveEntryFilter;

util.inherits(BorhanLiveEntryFilter, BorhanLiveEntryBaseFilter);


/**
 */
function BorhanMediaFlavorParamsOutputFilter(){
  BorhanMediaFlavorParamsOutputFilter.super_.call(this);
};
module.exports.BorhanMediaFlavorParamsOutputFilter = BorhanMediaFlavorParamsOutputFilter;

util.inherits(BorhanMediaFlavorParamsOutputFilter, BorhanMediaFlavorParamsOutputBaseFilter);


/**
 */
function BorhanPdfFlavorParamsOutputFilter(){
  BorhanPdfFlavorParamsOutputFilter.super_.call(this);
};
module.exports.BorhanPdfFlavorParamsOutputFilter = BorhanPdfFlavorParamsOutputFilter;

util.inherits(BorhanPdfFlavorParamsOutputFilter, BorhanPdfFlavorParamsOutputBaseFilter);


/**
 */
function BorhanScpDropFolderFilter(){
  BorhanScpDropFolderFilter.super_.call(this);
};
module.exports.BorhanScpDropFolderFilter = BorhanScpDropFolderFilter;

util.inherits(BorhanScpDropFolderFilter, BorhanScpDropFolderBaseFilter);


/**
 */
function BorhanSftpDropFolderFilter(){
  BorhanSftpDropFolderFilter.super_.call(this);
};
module.exports.BorhanSftpDropFolderFilter = BorhanSftpDropFolderFilter;

util.inherits(BorhanSftpDropFolderFilter, BorhanSftpDropFolderBaseFilter);


/**
 */
function BorhanSwfFlavorParamsOutputFilter(){
  BorhanSwfFlavorParamsOutputFilter.super_.call(this);
};
module.exports.BorhanSwfFlavorParamsOutputFilter = BorhanSwfFlavorParamsOutputFilter;

util.inherits(BorhanSwfFlavorParamsOutputFilter, BorhanSwfFlavorParamsOutputBaseFilter);


/**
 */
function BorhanWidevineFlavorParamsOutputFilter(){
  BorhanWidevineFlavorParamsOutputFilter.super_.call(this);
};
module.exports.BorhanWidevineFlavorParamsOutputFilter = BorhanWidevineFlavorParamsOutputFilter;

util.inherits(BorhanWidevineFlavorParamsOutputFilter, BorhanWidevineFlavorParamsOutputBaseFilter);


/**
 */
function BorhanLiveChannelBaseFilter(){
  BorhanLiveChannelBaseFilter.super_.call(this);
};
module.exports.BorhanLiveChannelBaseFilter = BorhanLiveChannelBaseFilter;

util.inherits(BorhanLiveChannelBaseFilter, BorhanLiveEntryFilter);


/**
 */
function BorhanLiveStreamEntryBaseFilter(){
  BorhanLiveStreamEntryBaseFilter.super_.call(this);
};
module.exports.BorhanLiveStreamEntryBaseFilter = BorhanLiveStreamEntryBaseFilter;

util.inherits(BorhanLiveStreamEntryBaseFilter, BorhanLiveEntryFilter);


/**
 */
function BorhanLiveChannelFilter(){
  BorhanLiveChannelFilter.super_.call(this);
};
module.exports.BorhanLiveChannelFilter = BorhanLiveChannelFilter;

util.inherits(BorhanLiveChannelFilter, BorhanLiveChannelBaseFilter);


/**
 */
function BorhanLiveStreamEntryFilter(){
  BorhanLiveStreamEntryFilter.super_.call(this);
};
module.exports.BorhanLiveStreamEntryFilter = BorhanLiveStreamEntryFilter;

util.inherits(BorhanLiveStreamEntryFilter, BorhanLiveStreamEntryBaseFilter);


/**
 */
function BorhanLiveStreamAdminEntryBaseFilter(){
  BorhanLiveStreamAdminEntryBaseFilter.super_.call(this);
};
module.exports.BorhanLiveStreamAdminEntryBaseFilter = BorhanLiveStreamAdminEntryBaseFilter;

util.inherits(BorhanLiveStreamAdminEntryBaseFilter, BorhanLiveStreamEntryFilter);


/**
 */
function BorhanLiveStreamAdminEntryFilter(){
  BorhanLiveStreamAdminEntryFilter.super_.call(this);
};
module.exports.BorhanLiveStreamAdminEntryFilter = BorhanLiveStreamAdminEntryFilter;

util.inherits(BorhanLiveStreamAdminEntryFilter, BorhanLiveStreamAdminEntryBaseFilter);


