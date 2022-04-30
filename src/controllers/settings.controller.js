import Setting from "../models/Setting"

export const getSettings = async(req, res) => {
    const settings = await Setting.find();
    res.json(settings)
}

export const createSetting = async (req, res) => {
    try {
        const { 
            companyName,
            description,
            businessName,
            ruc,
            url,
            logo,
            tax
        } = req.body;
    
        const newSetting =  new Position({
            companyName,
            description,
            businessName,
            ruc,
            url,
            logo,
            tax
        })

        const savedSetting = await newSetting.save();

        res.status(201).json({ status: 201, savedSetting });
    } catch (error) {
        res.status(400).json({ status: 400, message: 'No se creó las configuraciones' });
    }
}

export const getSettingById = async (req, res) => {
    const setting = await Setting.findById(req.params.settingId);
    res.status(200).json(setting)
}

export const updateSettingById = async (req, res) => {
    try {
        const updateSetting = await Setting.findByIdAndUpdate(
            req.params.settingId, 
            req.body, {
                new: true
            }
        )
        res.status(200).json({ status: 200, updateSetting })
    } catch (error) {
        res.status(400).json({ status: 400, message: 'No se actualizó las configuraciones' });
    }
}