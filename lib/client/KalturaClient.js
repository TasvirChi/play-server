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
/**
 * The Borhan Client - this is the facade through which all service actions should be called.
 * @param config the Borhan configuration object holding partner credentials (type: BorhanConfiguration).
 */
var util = require('util');
var borhan = require('./BorhanClientBase');
borhan.objects = require('./BorhanVO');
borhan.services = require('./BorhanServices');
borhan.enums = require('./BorhanTypes');

function BorhanClient(config) {
  this.init(config);
};

module.exports = borhan;
module.exports.BorhanClient = BorhanClient;

util.inherits(BorhanClient, borhan.BorhanClientBase);
BorhanClient.prototype.apiVersion = "3.1.6";

/**
 * Base Entry Service
 *   
 * @param borhan.services.BorhanBaseEntryService
 */
BorhanClient.prototype.baseEntry = null;
/**
 * Live Stream service lets you manage live stream entries
 *   
 * @param borhan.services.BorhanLiveStreamService
 */
BorhanClient.prototype.liveStream = null;
/**
 * Permission service lets you create and manage user permissions
 * @param borhan.services.BorhanPermissionService
 */
BorhanClient.prototype.permission = null;
/**
 * Session service
 *   
 * @param borhan.services.BorhanSessionService
 */
BorhanClient.prototype.session = null;
/**
 * UiConf service lets you create and manage your UIConfs for the various flash components
 *   This service is used by the BMC-ApplicationStudio
 *   
 * @param borhan.services.BorhanUiConfService
 */
BorhanClient.prototype.uiConf = null;
/**
 * Metadata service
 *   
 * @param borhan.services.BorhanMetadataService
 */
BorhanClient.prototype.metadata = null;
/**
 * Cue Point service
 *   
 * @param borhan.services.BorhanCuePointService
 */
BorhanClient.prototype.cuePoint = null;
/**
 * The client constructor.
 * @param config the Borhan configuration object holding partner credentials (type: BorhanConfiguration).
 */
BorhanClient.prototype.init = function(config){
  //call the super constructor:
  borhan.BorhanClientBase.prototype.init.apply(this, arguments);
  //initialize client services:
  this.baseEntry = new borhan.services.BorhanBaseEntryService(this);
  this.liveStream = new borhan.services.BorhanLiveStreamService(this);
  this.permission = new borhan.services.BorhanPermissionService(this);
  this.session = new borhan.services.BorhanSessionService(this);
  this.uiConf = new borhan.services.BorhanUiConfService(this);
  this.metadata = new borhan.services.BorhanMetadataService(this);
  this.cuePoint = new borhan.services.BorhanCuePointService(this);
};
