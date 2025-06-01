
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, MessageCircle, CreditCard, Share, Copy, CheckCircle } from 'lucide-react';

interface GroupBookingOptionsProps {
  bookingData: any;
  selectedPackage: 'bundle' | 'event-only';
  onGroupSetup: (groupData: any) => void;
  onBack: () => void;
}

const GroupBookingOptions = ({ bookingData, selectedPackage, onGroupSetup, onBack }: GroupBookingOptionsProps) => {
  const [groupData, setGroupData] = useState({
    groupName: '',
    inviteList: [] as { name: string; phone: string; email: string }[],
    splitPayment: true,
    groupChat: true,
    inviteLink: `https://app.swiggy.com/invite/group/${Math.random().toString(36).substr(2, 9)}`
  });

  const [newInvite, setNewInvite] = useState({ name: '', phone: '', email: '' });
  const [linkCopied, setLinkCopied] = useState(false);

  const handleAddInvite = () => {
    if (newInvite.name && newInvite.phone) {
      setGroupData({
        ...groupData,
        inviteList: [...groupData.inviteList, newInvite]
      });
      setNewInvite({ name: '', phone: '', email: '' });
    }
  };

  const handleRemoveInvite = (index: number) => {
    setGroupData({
      ...groupData,
      inviteList: groupData.inviteList.filter((_, i) => i !== index)
    });
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(groupData.inviteLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleSubmit = () => {
    onGroupSetup(groupData);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-3">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Setup Group Booking</h3>
          <p className="text-sm text-gray-600">Invite friends and coordinate your experience</p>
        </div>
      </div>

      {/* Group Name */}
      <Card className="p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Group Name</h4>
        <input
          type="text"
          value={groupData.groupName}
          onChange={(e) => setGroupData({ ...groupData, groupName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          placeholder="Friday Night Out Gang"
        />
      </Card>

      {/* Invite Friends */}
      <Card className="p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Invite Friends</h4>
        
        {/* Quick Invite Link */}
        <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-900">Quick Invite Link</span>
            <Button
              size="sm"
              variant="outline"
              onClick={copyInviteLink}
              className="text-orange-600 border-orange-300 hover:bg-orange-100"
            >
              {linkCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {linkCopied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="text-xs text-orange-700 bg-white p-2 rounded border border-orange-200 font-mono">
            {groupData.inviteLink}
          </div>
          <p className="text-xs text-orange-600 mt-1">Share this link with friends to join your group</p>
        </div>

        {/* Manual Invites */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="text"
                value={newInvite.name}
                onChange={(e) => setNewInvite({ ...newInvite, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Friend's name"
              />
            </div>
            <div>
              <input
                type="tel"
                value={newInvite.phone}
                onChange={(e) => setNewInvite({ ...newInvite, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Phone number"
              />
            </div>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={handleAddInvite}
            className="w-full bg-orange-500 hover:bg-orange-600"
            disabled={!newInvite.name || !newInvite.phone}
          >
            Add Friend
          </Button>
        </div>

        {/* Invite List */}
        {groupData.inviteList.length > 0 && (
          <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-900 mb-2">Invited Friends ({groupData.inviteList.length})</h5>
            <div className="space-y-2">
              {groupData.inviteList.map((invite, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <span className="text-sm font-medium">{invite.name}</span>
                    <span className="text-xs text-gray-500 ml-2">{invite.phone}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveInvite(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Group Features */}
      <Card className="p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Group Features</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium">Split Payment</span>
              <p className="text-xs text-gray-600">Divide costs equally among group members</p>
            </div>
            <Button
              size="sm"
              variant={groupData.splitPayment ? "default" : "outline"}
              onClick={() => setGroupData({ ...groupData, splitPayment: !groupData.splitPayment })}
              className={groupData.splitPayment ? 'bg-orange-500 hover:bg-orange-600' : 'hover:bg-orange-50'}
            >
              <CreditCard className="h-4 w-4 mr-1" />
              {groupData.splitPayment ? 'Enabled' : 'Enable'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium">Group Chat</span>
              <p className="text-xs text-gray-600">Coordinate plans with built-in messaging</p>
            </div>
            <Button
              size="sm"
              variant={groupData.groupChat ? "default" : "outline"}
              onClick={() => setGroupData({ ...groupData, groupChat: !groupData.groupChat })}
              className={groupData.groupChat ? 'bg-orange-500 hover:bg-orange-600' : 'hover:bg-orange-50'}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {groupData.groupChat ? 'Enabled' : 'Enable'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Group Summary */}
      <Card className="p-4 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Group Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Total Party Size</span>
            <span>{bookingData.partySize + groupData.inviteList.length} people</span>
          </div>
          <div className="flex justify-between">
            <span>Package Type</span>
            <span>{selectedPackage === 'bundle' ? 'Dinner + Event' : 'Event Only'}</span>
          </div>
          {groupData.splitPayment && (
            <div className="flex justify-between text-green-600">
              <span>Cost Per Person</span>
              <span>₹{Math.round((selectedPackage === 'bundle' ? 1200 : 400) / (bookingData.partySize + groupData.inviteList.length))}</span>
            </div>
          )}
        </div>
      </Card>

      <Button 
        onClick={handleSubmit} 
        className="w-full bg-orange-500 hover:bg-orange-600 py-3"
      >
        Create Group Booking
      </Button>
    </div>
  );
};

export default GroupBookingOptions;
