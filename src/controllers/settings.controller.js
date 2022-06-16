import Setting from "../models/Setting";

export const getSettings = async (req, res) => {
  const settings = await Setting.find();
  res.json({ status: 200, doc: settings[0] });
};

export const updateSettingById = async (req, res) => {
  try {
    const updateSetting = await Setting.findByIdAndUpdate(
      req.params.settingId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ status: 200, doc: updateSetting });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se actualizó las configuraciones" });
  }
};
